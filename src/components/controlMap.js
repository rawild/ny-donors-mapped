import React from 'react'
import { Legends } from './legends.js'
import { Map } from './map.js'

class ControlMap extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            colorData: "",
            key: 0,
        }
    }

    onButtonClick(d) {
        const key = this.state.key
        this.setState(
            {
                colorData: d,
                key: key+1
            }
        )
    }

    render() {
        const colorData= this.state.colorData
        return (
            <div>
                <Legends onButtonClick={(d)=>this.onButtonClick(d)} />
                <Map key={this.state.key} colorData={colorData} attribution={colorData}/>
            </div>
        )
    }
}

export {ControlMap};