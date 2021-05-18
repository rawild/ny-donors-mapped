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
        const countryData = this.state.data        
        return(
            <div>
                <div className='dark'>
                    <div className='section-header'>{'Success Geocoding Individual Donors'}</div>
                    <div className='blurb'>
                        Geocoding is the process where by addresses are resolved to longitude and latitude, that is: precise points on a map that
                        can be analyzed. In this project the addresses were first geocoded against the US Census Bureau's geocoding api, which is 
                        free to use but very slow. Because of the large volume (639,722) of addresses, multithreading was used to speed up the process.
                        Even with six processes running it took over 22 hours to complete the geocoding. An example of the script used can be found here. <br/><br/>
                        After the US Census geocoding, there were still 95,630 donor addresses that could not be resolved to an geographic coordinate. 
                        These addresses were then geocoded against the HERE geocoder. After this, all but 2,127 were resolved. As shown above, that means 
                        99.7% of the donors were able to be geocoded. The missing donors contributed $751,881, less than .2% of the total.
                    </div>
                </div>
                <div className='section-header'>{'.02% of the Money came from outside the US'}</div>
                <div className='blurb'>99.98% of the money ($401.7 Million) of the money came from the US, but here are the other countries with the
                most donations.</div>
                <BarChart barClass='countryBar' title={"Amount Donated from People in Other Countries"} 
                data={countryData} xAxisAttribute={"value"} yAxisAttribute={"name"}
                width={800} height={400} />

            </div>
        )
    }
}

export {GeocodingPanel}