import React from 'react';
import { PieChart } from './pieChart.js'
import summarydata from '../data/summary_data'


class PieChartPanel extends React.Component {
    render(){
        return (
            <div>
                <div className='section-header'>About this data</div>
                <div className='flex-wrapper'>
                        
                        <PieChart pieClass='donorPie' title={'Number of Donors since 2016'} 
                        data={summarydata.NumberOfDonors} 
                        width={500} height={200} />
                        <PieChart pieClass='amountPie' title={'Amount Donated since 2016'} 
                        data={summarydata.AmountOfDonations} 
                        width={500} height={200} format={'$,.0f'}/>
                </div>
            </div>
        )
    }
}

export {PieChartPanel}