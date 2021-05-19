import React from 'react'
import { StackedBarChart } from './stackedBarChart.js'

class RecipientsPanel extends React.Component{
    render(){
        return(
            <StackedBarChart barClass={'recipientsBar'} yAxisAttribute={'Name '} height={1000} width={1000} />
        )
    }
}

export {RecipientsPanel}