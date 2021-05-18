import React from 'react'
import { PieChart } from './pieChart.js'
import summarydata from '../data/summary_data'
import * as d3 from 'd3'
import states_donors_sum from '../data/states_donors_sum.csv'
import { Table } from './table.js'

class StatesPanel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            columns: [{'Header':'Loading','accessor':('loading')}]
        }
    }
    componentDidMount() {
        d3.csv(states_donors_sum).then((data)=>{
            this.setState({
                data: data,
                columns: data.columns.map((d) => {
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
    }

    render(){
        console.log("state",this.state)
        const statesData = this.state.data  
        const columns = this.state.columns      
        return(
            <div>
                <div className='section-header'>{'Donors Across the US'}</div>
                <div className='flex-wrapper'>
                    <PieChart pieClass='statePie' title={ '84% of Donations Came from New York'} 
                    data={summarydata.StatesDonors} 
                    width={500} height={200} format={"$,.0f"} />
                    <Table data={statesData} columns={columns} initialState={{pageIndex:0,pageSize:10}}/>
                </div>
            </div>
        )
    }
}

export {StatesPanel};