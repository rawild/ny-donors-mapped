import React from 'react'
import {colors} from '../style/colors.js'

class Entry extends React.Component{
    render(){
        return(
            <div className='legend-entry'>
                <div className='legend-box' style={{backgroundColor:this.props.color}}></div><div className='legend-range'>{this.props.range}</div>
            </div>
        )
    }
}

class Legend extends React.Component {
    render() {
        const entries = this.props.entries.map((d) => {
            return (
                <div>
                <Entry color={d[0]} range={d[1]} />
               </div>
            )
        })

        return(
            <div className="map-legend" >
                <div>{this.props.value}</div>
                <div>{entries}</div>
            </div>
        )
    }
}


class Legends extends React.Component {
    
    render(){
        return (
            <div className="map-controls">
                <Legend entries={[[colors.grey,'$0'],[colors.red1,'$1-$6,945'],[colors.red2,'$6,946-$16,650'],
                [colors.red3,'$16,651-$35,089'],[colors.red4,'$35,090-$79,884'],[colors.red5,'$79,885-$7,358,771']]} 
                value="Total Donations" />
                <Legend entries={[[colors.grey,'$0'],[colors.orange1,'$.01-$2.24'],[colors.orange2,'$2.25-$4.87'],
                [colors.orange3,'$4.88-$9.75'],[colors.orange4,'$9.76-$19.95'],[colors.orange5,'$19.96-$40,344']]} 
                value="Donated Per Person" />
                <Legend entries={[[colors.grey,'No Data'],[colors.green1,'$1-$44,111'],[colors.green2,'$44,112-$59,340'],
                [colors.green3,'$59,341-$75,756'],[colors.green4,'$75,757-$99,341'],[colors.green5,'$99,342-$250,001+']]} 
                value="Median Household Income" />
            </div>
        )
    }
}


export {Legends};