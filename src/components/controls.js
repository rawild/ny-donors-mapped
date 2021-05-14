import React from 'react'

class Button extends React.Component {
    render() {
        return(
            <button className="map-control" 
            onClick={() => this.props.onClick()}>
            {this.props.value}
            </button>
        )
    }
}


class Controls extends React.Component {
    
    render(){
        return (
            <div class="map-controls">
            <Button onClick={()=>this.props.onButtonClick('totaldonations')} value="Total Donations" />
            <Button onClick={()=>this.props.onButtonClick('perperson')} value="Donations Per Person" />
            <Button onClick={()=>this.props.onButtonClick('income')} value="Median Income"  />
            </div>
        )
    }
}


export {Controls};