import React from 'react'
import { StackedBarChart } from './stackedBarChart.js'

class RecipientsPanel extends React.Component{
    render(){
        return(
            <div>
                <div className='section-header'>Who gets this money?</div>
                    <div className='blurb'>Below are the recipients who recieved the most donations from these individual donors. 
                    As you can see almost all of them get the majority of their donations from the highest income areas. Andrew Cuomo
                    gets the most money by far. Interestingly many of them get more money from the lowest income areas than from 
                    low income areas, which I attribute to the above effect where downtown Albany is a lowest income area and also 
                    home to many lobbyist offices.
                    </div>
                <StackedBarChart barClass={'recipientsBar'} yAxisAttribute={'Name '} height={600} width={1000} 
                title={'The Donations by Income to Biggest Recipients'}/>
            </div>
        )
    }
}

export {RecipientsPanel}