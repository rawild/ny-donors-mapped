import React from 'react'
import { PieChart } from './pieChart.js'
import summarydata from '../data/summary_data'
import * as d3 from 'd3'
import states_donors_sum from '../data/states_donors_sum.csv'
import arkansas_donors_cleaned from '../data/arkansas_donors_cleaned.csv'
import { Table } from './table.js'

class StatesPanel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stateData: [],
            arkansasData: [],
            stateColumns: [{'Header':'Loading','accessor':('loading')}],
            arkansasColumns: [{'Header':'Loading','accessor':('loading')}]
        }
    }
    componentDidMount() {
        d3.csv(states_donors_sum).then((data)=>{
            console.log(data)
            this.setState({
                stateData: data,
                stateColumns: data.columns.map((d) => {
                    if (d === "Total Donated") {
                        return ({'Header': d,'accessor': d,
                        Cell: ({value})=>d3.format("$,.0f")(value)})
                    }else if (d === "Number of Donors"){
                        return ({'Header': d,'accessor': d,
                        Cell: ({value})=>d3.format(",d")(value)})
                    } else {
                        return ({'Header': d,'accessor': d})
                    }
                })
            })
        })
        d3.csv(arkansas_donors_cleaned).then((data)=>{
            console.log(data)
            this.setState({
                arkansasData: data,
                arkansasColumns: data.columns.map((d)=>{
                    if (d === "Donation Amount") {
                        return ({'Header': d,'accessor': d,
                        Cell: ({value})=>d3.format("$,.0f")(value)})
                    }
                    return ({'Header': d,'accessor': d})
                })
            })
        })
    }

    render(){
        console.log("state",this.state)
        const stateData = this.state.stateData  
        const stateColumns = this.state.stateColumns      
        return(
            <div>
                <div className='section-header'>{'Donors Across the US'}</div>
                <div className='blurb'>Most of the donations come from New York. The rest are adjacent states or populous states. Notable exceptions 
                to this include Arkansas, where 239 donors contributed more than $7 million, and the District of Columbia. </div>
                <div className='flex-wrapper'>
                    <PieChart pieClass='statePie' title={ '84% of Donations Came from New York'} 
                    data={summarydata.StatesDonors} 
                    width={500} height={200} format={"$,.0f"} />
                    <Table data={stateData} columns={stateColumns} initialState={{pageIndex:0,pageSize:10}}/>
                </div>
                <div className='section-header'>Who donates from Arkansas?</div>
                <div className='flex-wrapper'>
                    <Table data={this.state.arkansasData} columns={this.state.arkansasColumns} initialState={{pageIndex:0,pageSize:10}}/>
                </div>
            </div>
        )
    }
}

export {StatesPanel};