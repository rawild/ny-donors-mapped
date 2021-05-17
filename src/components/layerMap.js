import React from 'react'
import { Legends } from './legends.js'
import { Map } from './map.js'
import {Layers} from './layers.js'

class LayerMap extends React.Component {
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
        const layers = <Layers/>
        return (
            <div>
                <Legends onButtonClick={(d)=>this.onButtonClick(d)} />
                <Map key={this.state.key} colorData={colorData} attribution={colorData} layers={layers}/>
            </div>
        )
    }
}

export {LayerMap};