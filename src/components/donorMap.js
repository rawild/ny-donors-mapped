import React from 'react'
import { Map } from './map.js'
import { GeoJSON } from 'react-leaflet'
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
            selectedTract: '36061011202'
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

    getMedianIncomeStyle(f){
        let getColor = (d) => {
            let colorsarray = [colors.grey, colors.green5, colors.green4, colors.green3, colors.green2, colors.green1]
            let color = d === 0 ? colorsarray[0] :
            (d > 99342) ? colorsarray[1] :
            (d > 75757) ? colorsarray[2] : 
            (d > 59341)  ? colorsarray[3] : 
            (d > 44112)  ? colorsarray[4] : colorsarray[5];
         return color
        }
        return {
            fillColor: getColor(f.properties.median_inc),
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7,
            color: '#000000'
        }
    } 
    setSelectedTract(tract){
        this.setState({
            selectedTract: tract,
        })
    }
    onClick(e){
        console.log('e',e)
    }
    onEachFeature(feature, layer){
        const onClick=(e)=>{
            this.setState({
                selectedTract: e.target.feature.properties.sub_geo_id
            })
        }
        layer.on({
            click: onClick
        })
    }


    render(){
        console.log('state',this.state)
        
        const top_100 = <GeoJSON  data = {top_100_tracts} style={this.getMedianIncomeStyle} onEachFeature={this.onEachFeature.bind(this)}></GeoJSON>
        let selectedData=  d3.filter(this.state.data,(d) => d.sub_geo_id === this.state.selectedTract)
        const columns = this.state.columns
        return (<div>
                    <div className='section-header'>Explore the Donors of the Census Tracts with the Most $$ Donated</div>
                    <div className='flex-wrapper'>
                        <div className='donor-map'>
                            <Map layers = {top_100} />
                        </div>
                        <div className='donor-table'>
                        <Table data={selectedData} columns={columns} />
                        </div>
                    </div>
                </div>)
    }
}

export {DonorMap};