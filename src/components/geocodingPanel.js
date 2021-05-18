import React from 'react'
import { PieChart } from './pieChart.js'
import { BarChart } from './barChart.js'
import summarydata from '../data/summary_data'
import * as d3 from 'd3'
import top_10_countries from '../data/top_10_countries.csv'

class GeocodingPanel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
        }
    }
    componentDidMount() {
        d3.csv(top_10_countries).then((data)=>{
            this.setState({
                data: data,
            })
        })
    }

    render(){
        console.log("state",this.state)
        let percentGeocoded = summarydata.TotalGeocoded[0].value/(summarydata.TotalGeocoded[0].value+
            summarydata.TotalGeocoded[1].value) * 100
        const countryData = this.state.data        
        return(
            <div>
                <div className='section-header'>{'Success Geocoding Individual Donors'}</div>
                <div className='flex-wrapper'>
                    <PieChart pieClass='geocodedPie' title={ d3.format('.1f')(percentGeocoded) + '% of Individual Donors Geocoded'} 
                    data={summarydata.TotalGeocoded} 
                    width={500} height={200} />
                    <div>{"The missing donors contributed $751,881, less than .2% of the total."}</div>
                </div>
                <div>{"99.98% ($401,702,414) of the money came from people who  were in the US, but here's the list of top other countries"}</div>
                <BarChart barClass='countryBar' title={"Amount Donated from People in Other Countries"} 
                data={countryData} xAxisAttribute={"value"} yAxisAttribute={"name"}
                width={800} height={400} />

            </div>
        )
    }
}

export {GeocodingPanel}