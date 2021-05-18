import React from 'react';
import { PieChart } from './pieChart.js'


class PieChartPanel extends React.Component {
    render(){
        return (
            <div className='flex-wrapper'>
                <div className='left'>
                    <PieChart pieClass='donorPie' title={'Number of Donors since 2016'} 
                    data={[{name: 'Organizational Donors', value: 77540},{name:'Individual Donors', value:639722}]} 
                    width={500} height={200} />
                </div>
                <div className='right'>
                    <PieChart pieClass='amountPie' title={'Amount Donated since 2016'} 
                    data={[{name: 'Organizations', value:  512786078.32 },{name:'Individuals', value: 402543935.72 }]} 
                    width={500} height={200} format={'$,.0f'}/>
                </div>
            </div>
        )
    }
}

export {PieChartPanel}