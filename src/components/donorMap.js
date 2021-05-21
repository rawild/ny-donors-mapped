import React from 'react'
import { Map } from './map.js'
import { GeoJSON, useMap } from 'react-leaflet'
import { Table } from './table.js'
import top_100_tracts  from '../data/top_100_tracts'
import {colors} from '../style/colors.js'
import * as d3 from 'd3'
import top_100_tracts_contributions from '../data/top_100_tracts_contributions.csv'


class DonorMap extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            columns: [],
            selectedTract: '36119011800',
            selectedTractIncome: '217500',
            selectedTractPerPerson: '108',
            
        }
    }
    componentDidMount() {
        d3.csv(top_100_tracts_contributions).then((data)=>{
            this.setState({
                data: data,
                columns: data.columns.slice(0,data.columns.length-1).map((d) => {
                    if (d != 'Donation Amount'){
                        return ({'Header': d,'accessor': d})
                    } else {
                        return ({'Header': 'Donation', accessor: 'Donation Amount', 
                        Cell: ({value})=>d3.format("$,.0f")(value)})
                    }
                }),
            })
        })
    }

    getTotalDonatedStyle(f){
        let getColor = (d) => {
            let colorsarray = [colors.grey,colors.red5,colors.red4,colors.red3,colors.red2,colors.red1]
            let color = d === 0 ? colorsarray[0] :
            (d > 79884) ? colorsarray[1] :
            (d > 35090) ? colorsarray[2] : 
            (d > 16650)  ? colorsarray[3] : 
            (d > 6946)  ? colorsarray[4] : colorsarray[5];
         return color
        }
        return {
            fillColor: this.state.selectedTract === f.properties.sub_geo_id?'#FBEEB8':getColor(f.properties.total_donated),
            weight: this.state.selectedTract === f.properties.sub_geo_id?3:1,
            opacity: 1,
            fillOpacity: 0.7,
            color: this.state.selectedTract === f.properties.sub_geo_id?'#ffa20c':'#000000'
        }
    } 
    setSelectedTract(tract){
        this.setState({
            selectedTract: tract,
        })
    }
    onEachFeature(feature, layer){
        const onClick=(e)=>{
            this.setState({
                selectedTract: e.target.feature.properties.sub_geo_id,
                selectedTractIncome: e.target.feature.properties.median_inc,
                selectedTractPerPerson: e.target.feature.properties.total_donated/e.target.feature.properties.S0101_C01_001E
            })
            e.target.setStyle(this.getTotalDonatedStyle(e.target.feature))
            console.log(e)
            
        }
        layer.on({
            click: onClick
        })
    }

    getMedianIncomeClass(medianIncome){
        return medianIncome === 0 ? ' mi-0' :
        (medianIncome > 99342) ? ' mi-1' :
        (medianIncome > 75757) ? ' mi-2': 
        (medianIncome > 59341)  ? ' mi-3' : 
        (medianIncome > 44112)  ? ' mi-4' : ' mi-5';
    }

    getTotalDonatedClass(totalDonated){
        return totalDonated === 0 ? 'mi-0' :
        (totalDonated > 79884) ? 'td-1' :
        (totalDonated > 35090) ? 'td-2' : 
        (totalDonated > 16650)  ? 'td-3' : 
        (totalDonated > 6946)  ? 'td-4' : 'td-5';
    }
    
    getDonatedPerPersonClass(DonatedPerPerson) {
        return DonatedPerPerson === 0 ? 'mi-0' :
        (DonatedPerPerson  > 19.95) ? 'dpp-1' :
        (DonatedPerPerson  > 9.76) ? 'dpp-2' : 
        (DonatedPerPerson  > 4.88)  ? 'dpp-3' : 
        (DonatedPerPerson  > 2.24)  ? 'dpp-4' : 'dpp-5';
    }
    

    render(){
   
        const top_100 = <GeoJSON data = {top_100_tracts} style={this.getTotalDonatedStyle.bind(this)} onEachFeature={this.onEachFeature.bind(this)}></GeoJSON>
        let selectedData=  d3.filter(this.state.data,(d) => d.sub_geo_id === this.state.selectedTract)
        let sum = d3.sum(selectedData,(d)=>d['Donation Amount'])
        const columns = this.state.columns
        return (<div>
                    <div className='section-header'>Explore the Donors from the Census Tracts with the Most Money Donated</div>
                    <div className='tract-info'>The selected census tract donated: 
                       <div className='flex-wrapper'> <div className='mi-div'>
                        <div className={this.getTotalDonatedClass(sum)}>
                            <div className='padding'>{d3.format("$,d")(sum)}</div>
                            </div>
                        </div> 
                        <div className='padding'>from </div>
                        <div className='mi-div'>
                            <div className={this.getDonatedPerPersonClass(this.state.selectedTractPerPerson)}>
                                <div className='padding'>{selectedData.length} donors</div>
                            </div>
                        </div> in the last 5 years.
                        <div className='padding'></div>
                        <div >It has a median household income of </div>
                    <div className='mi-div'>
                        <div className={this.getMedianIncomeClass(this.state.selectedTractIncome)}>
                            <div className='padding'>{d3.format("$,d")(this.state.selectedTractIncome)}</div>
                            </div>
                            </div>
                            <br/>
                    </div>
                    Select another census tract to see its donors!</div>
                    <div className='flex-wrapper'>
                        <div className='donor-map'>
                            <Map layers = {top_100} zoom={6.5} />
                        </div>
                        <div className='donor-table'>
                        <Table data={selectedData} columns={columns} initialState={{pageIndex:0,pageSize:15}}
                            />
                        </div>
                    </div>
                    <div className="spacer"/>
                    <div>If you are interested in the methods behind this project, check out my white paper <a href='https://github.com/rawild/ny-donors-mapped'>here</a>.</div>
                    <div className="spacer"/>
                    <div className="spacer"/>
                </div>)
    }
}

export {DonorMap};