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
                selectedTract: e.target.feature.properties.sub_geo_id
            })
            e.target.setStyle(this.getTotalDonatedStyle(e.target.feature))
            console.log(e)
            
        }
        layer.on({
            click: onClick
        })
    }


    render(){
   
        const top_100 = <GeoJSON data = {top_100_tracts} style={this.getTotalDonatedStyle.bind(this)} onEachFeature={this.onEachFeature.bind(this)}></GeoJSON>
        let selectedData=  d3.filter(this.state.data,(d) => d.sub_geo_id === this.state.selectedTract)
        const columns = this.state.columns
        return (<div>
                    <div className='section-header'>Explore the Donors from the Census Tracts with the Most Money Donated</div>
                    <div className='flex-wrapper'>
                        <div className='donor-map'>
                            <Map layers = {top_100} zoom={6} />
                        </div>
                        <div className='donor-table'>
                        <Table data={selectedData} columns={columns} initialState={{pageIndex:0,pageSize:15}}
                            />
                        </div>
                    </div>

                </div>)
    }
}

export {DonorMap};