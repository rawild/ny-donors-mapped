import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'


class Map extends React.Component {
    render() {
        return (
            <MapContainer center={[42.757790, -76.090889]} zoom={this.props.zoom} scrollWheelZoom={true} >
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.props.layers}
            </MapContainer>
            );
    }
}

export {Map};