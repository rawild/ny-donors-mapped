import React from 'react'
import census_tracts from './data/ny_tract_sum_count_inc_pop'
import { MapContainer, TileLayer, Tooltip, GeoJSON } from 'react-leaflet'
import {format} from 'd3-format'

class Map extends React.Component {
   

    getStyle(f) {
        let getColor = (d) => {
            let color = d === 0 ? '#dcd6d6' :
            (d > 79884) ? '#67000d' :
            (d > 35090) ? '#d42020' : 
            (d > 16650)  ? '#fc7050' : 
            (d > 6946)  ? '#fdbea5' : '#fff5f0';
         return color
        }
        return {
            fillColor: getColor(f.properties.total_donated),
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7,
            color: '#000000'
        }
    }
    getMedianIncomeClass(medianIncome){
        let css = '';
        
        return medianIncome === 0 ? css+' mi-0' :
        (medianIncome > 99342) ? css+' mi-1' :
        (medianIncome > 75757) ? css+' mi-2': 
        (medianIncome > 59341)  ? css+' mi-3' : 
        (medianIncome > 44112)  ? css+' mi-4' : css+' mi-5';
    }

    getTotalDonatedClass(totalDonated){
        return totalDonated === 0 ? 'mi-0' :
        (totalDonated > 79884) ? 'td-1' :
        (totalDonated > 35090) ? 'td-2' : 
        (totalDonated > 16650)  ? 'td-3' : 
        (totalDonated > 6946)  ? 'td-4' : 'td-5';
    }
    getDonatedPerPersonClass(DonatedPerPerson) {
        return DonatedPerPerson === 0 ? 'mi-0' :
        (DonatedPerPerson  > 19.95) ? 'dpp-1' :
        (DonatedPerPerson  > 9.76) ? 'dpp-2' : 
        (DonatedPerPerson  > 4.88)  ? 'dpp-3' : 
        (DonatedPerPerson  > 2.24)  ? 'dpp-4' : 'dpp-5';
    }

    getToolTips = (feature,layer) => {
        let totalDonated = feature.properties.total_donated
        let medianIncome = feature.properties.median_inc
        let DonatedPerPerson = feature.properties.total_donated / (feature.properties.S0101_C01_001E)
        layer.bindTooltip(`<div class='map1-tooltip'>
                <div class=${this.getTotalDonatedClass(totalDonated)}><p class='tooltip-header'>Total Donated:</p>
                <p class='tooltip-text'>${format("$,")(totalDonated)}</p></div>
                <div class=${this.getDonatedPerPersonClass(DonatedPerPerson)}>
                <p class='tooltip-header'>Donated Per Person:</p>
                <p class='tooltip-text'>${format("$,.3r")(DonatedPerPerson)}</p></div>
                <div class=${this.getMedianIncomeClass(medianIncome)}> <p class='tooltip-header'>Median Income:</p>
                <p class='tooltip-text'>${format("$,")(medianIncome)}</p></div> `)
    }

    render() {
        
        return (
            <MapContainer center={[40.735234, -73.951136]} zoom={10} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON data = {census_tracts} style={this.getStyle} onEachFeature={this.getToolTips}>
                </GeoJSON> 
            </MapContainer>

            );
    }
}

export {Map};