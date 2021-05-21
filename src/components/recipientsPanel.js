import React from 'react'
import { StackedBarChart } from './stackedBarChart.js'

class RecipientsPanel extends React.Component{
    render(){
        return(
            <div>
                <div className='section-header'>Who gets this money?</div>
                    <div className='blurb'>Below are the recipients who recieved the most donations from these individual donors. 
                    As you can see almost all of them get the majority of their donations from the highest income areas. 
                    In the last 5 years alone Andrew Cuomo got $11 million from the donors in the wealthiest areas. 
                    That’s more than any other recipient got total. 
                    <br/><br/>
                    A further flaw in my analysis is revealed by the New Yorker's for a Balanced Albany, which is shown below to have
                    significant support from low-income areas. This PAC is in fact funded entirely by 45 donations only, all from billionaires
                    like Daniel Loeb and the Waltons.  It was formed to counter-act the push to oust the IDC in Albany. The IDC was a small group
                    of Democrats giving the Republicans control of the New York State Senate. <br/><br/>
                    Some of those billionaires like Roger Hertog live very close to central park, too close in fact,
                    for my geocoding, which put the latitude and longitudinal coordinates inside the census tract that is central park. According to the census, the census
                    tract that is central park as a median income of $0, thus making it seem like the New Yorkers for a Balanced Albany PAC gets $3 million from
                    the lowest income areas.<br/><br/>
                    Wealthy people give more to bigger recipients, overall. Almost all of these recipients have well above 54% of their money
                    from the highest income bracket. So their donations are concentrated at the top towards the most powerful people and PACs. 
                    </div>
                <StackedBarChart barClass={'recipientsBar'} yAxisAttribute={'Name '} height={600} width={1000} 
                title={'The Donations by Income to Biggest Recipients'}/>
            </div>
        )
    }
}

export {RecipientsPanel}