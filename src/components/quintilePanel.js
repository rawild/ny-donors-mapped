import React from 'react'
import { BarChart } from './barChart'
import quintiles from '../data/tract_quintile'
import {colors} from '../style/colors.js'


class QuintilePanel extends React.Component {
    getColor(d){
        let mi = d["Median Income "] 
        if (mi.indexOf("$1-$44,111")>-1){
            return colors.green1
        } 
        if (mi.indexOf("$44,112-$59,340") > -1){
            return colors.green2
        }
        if (mi.indexOf("$59,341-$75,576") > -1){
            return colors.green3
        }
        if (mi.indexOf("$75,757-$99,341") > -1){
            return colors.green4
        }

        return colors.green5
        
    }
    render(){
        return(
            <div>
                <div className='dark'><div className='section-header'>Analysis of Donors by Income with Census Data</div>
                <div className='blurb'>To analyze the class of these individual donors, the donors were grouped by census tract. 
                Those census tracts provide a median income as a proxy for the wealth of the individual. I've divided the census tracts up into quintiles,
                so each bracket represents 20% of the census tracts and roughly 20% of the population. As you can see below, more than
                half (54%) of the money donated came from donors that lived in the most wealthy areas. If you look at people living in the top
                two wealthiest tiers, the donations comprise 72%, almost three quarters, of the donors. And that is arguably and undercount, as 
                demonstrated by the census tract that encompasses downtown Albany that has a median income of $19,766 and yet had $905,552 donations.
                This counts as the lowest income bracket, which looks to have donated more than the second lowest. 
                This reveals a limitation of this method, where some of the lowest income census brackets
                like central Albany, which house offices for lobbyists. Many of the donors could have much higher incomes than the median for 
                the census tract they are reporting from. A crystal clear example of this is Wellsville where oil profiteer Charles Joyce lives. 
                The median income there is $45K but Charles wrote multiple $100K checks to put this tract on the list as one of the top 
                donators. You can explore in more detail below.<br/><br/>
                The census data used for median income comes from the 2019 ACS survey. It was accessed via the US Census API.</div>
                </div>
                <div className='section-header'>The Wealthiest 20% of the Population Contributes more than 50% of the Money</div>
                <div className='blurb'>...and thats an under count. Each bar represents a quintile of the census tracts (20%). As you can see, the 
                donations are not proportional to the populations.</div>
                <BarChart barClass='quintileBar' data={quintiles}  title={"Amount Donated by Median Income within NY"} 
                xAxisAttribute={"Total Donated"} yAxisAttribute={"Median Income "}
                width={800} height={400} fillColor={(d)=>this.getColor(d)} />
            </div>
        )
    }
}

export {QuintilePanel}