import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import {Layers} from './layers.js'


class Map extends React.Component {
    render() {
        return (
            <MapContainer center={[40.735234, -73.951136]} zoom={10} scrollWheelZoom={true} >
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Layers />
            </MapContainer>
            );
    }
}

export {Map};