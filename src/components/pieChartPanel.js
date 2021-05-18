import React from 'react';
import { PieChart } from './pieChart.js'
import summarydata from '../data/summary_data'
import * as d3 from 'd3'


class PieChartPanel extends React.Component {
    render(){
        let percentGeocoded = summarydata.TotalGeocoded[0].value/(summarydata.TotalGeocoded[0].value+
            summarydata.TotalGeocoded[1].value) * 100
        return (
            <div>
                <div className='section-header'>Which Political Donors?</div>
                <div className='blurb'>This project looks at people who have donated to New York state 
                and local races (not federal) between Jan 2016 and March 2021.
                It is an investigation into what areas the money comes from, how wealthy those areas are, and who is donating from those areas.
                The donor data has been cleaned and matched to try to ensure as much accuracy as possible. For more on the donor cleaning process 
                see <a href='https://academicworks.cuny.edu/cgi/viewcontent.cgi?article=5299&context=gc_etds'>my white paper</a>. <br/><br/>
                In general the donors can be divided into 2 groups: Individual and Organizational. As you can see below individual donors make up a large portion of the overal donor base,
                but contribute less than half of the total money.
                </div>
                <div className='flex-wrapper'>
                        <PieChart pieClass='donorPie' title={'Number of Donors since 2016'} 
                        data={summarydata.NumberOfDonors} 
                        width={300} height={200} />
                        <PieChart pieClass='amountPie' title={'Amount Donated since 2016'} 
                        data={summarydata.AmountOfDonations} 
                        width={300} height={200} format={'$,.0f'}/>
                        <PieChart pieClass='geocodedPie' title={ d3.format('.1f')(percentGeocoded) + '% of Individual Donors Geocoded'} 
                        data={summarydata.TotalGeocoded} 
                        width={300} height={200} />
                </div>
            </div>
        )
    }
}

export {PieChartPanel}