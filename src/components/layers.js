import React from 'react'
import { LayersControl, GeoJSON } from 'react-leaflet'
import census_tracts from '../data/ny_tract_sum_count_inc_pop'
import {format} from 'd3-format'

function getTotalDonatedStyle(f){
    let getColor = (d) => {
        let colors = ['#dcd6d6','#67000d','#d42020','#fc7050','#fdbea5','#fff5f0']
        let color = d === 0 ? colors[0] :
        (d > 79884) ? colors[1] :
        (d > 35090) ? colors[2] : 
        (d > 16650)  ? colors[3] : 
        (d > 6946)  ? colors[4] : colors[5];
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

function getMedianIncomeStyle(f){
    let getColor = (d) => {
        let colors = ['#dcd6d6','#00441b','#006d2c','#238b45','#41ab5d','#74c476']
        let color = d === 0 ? colors[0] :
        (d > 99342) ? colors[1] :
        (d > 75757) ? colors[2] : 
        (d > 59341)  ? colors[3] : 
        (d > 44112)  ? colors[4] : colors[5];
     return color
    }
    return {
        fillColor: getColor(f.properties.median_inc),
        weight: 1,
        opacity: 1,
        fillOpacity: 0.7,
        color: '#000000'
    }
} 

function getPerPersonStyle(f){
    let getColor = (d) => {
        let colors = ['#dcd6d6','#993404','#b64708','#d56012','#eb7e1e','#fe9929']
        let color = d === 0 ? colors[0] :
        (d > 99342) ? colors[1] :
        (d > 75757) ? colors[2] : 
        (d > 59341)  ? colors[3] : 
        (d > 44112)  ? colors[4] : colors[5];
     return color
    }
    return {
        fillColor: getColor(f.properties.median_inc),
        weight: 1,
        opacity: 1,
        fillOpacity: 0.7,
        color: '#000000'
    }
} 

function getMedianIncomeClass(medianIncome){
    return medianIncome === 0 ? ' mi-0' :
    (medianIncome > 99342) ? ' mi-1' :
    (medianIncome > 75757) ? ' mi-2': 
    (medianIncome > 59341)  ? ' mi-3' : 
    (medianIncome > 44112)  ? ' mi-4' : ' mi-5';
}

function getTotalDonatedClass(totalDonated){
    return totalDonated === 0 ? 'mi-0' :
    (totalDonated > 79884) ? 'td-1' :
    (totalDonated > 35090) ? 'td-2' : 
    (totalDonated > 16650)  ? 'td-3' : 
    (totalDonated > 6946)  ? 'td-4' : 'td-5';
}

function getDonatedPerPersonClass(DonatedPerPerson) {
    return DonatedPerPerson === 0 ? 'mi-0' :
    (DonatedPerPerson  > 19.95) ? 'dpp-1' :
    (DonatedPerPerson  > 9.76) ? 'dpp-2' : 
    (DonatedPerPerson  > 4.88)  ? 'dpp-3' : 
    (DonatedPerPerson  > 2.24)  ? 'dpp-4' : 'dpp-5';
}

const getToolTips = (feature,layer) => {
    let totalDonated = feature.properties.total_donated
    let medianIncome = feature.properties.median_inc
    let DonatedPerPerson = feature.properties.total_donated / (feature.properties.S0101_C01_001E)
    layer.bindTooltip(`<div class='map1-tooltip'>
            <div class=${getTotalDonatedClass(totalDonated)}><p class='tooltip-header'>Total Donated:</p>
            <p class='tooltip-text'>${format("$,")(totalDonated)}</p></div>
            <div class=${getDonatedPerPersonClass(DonatedPerPerson)}>
            <p class='tooltip-header'>Donated Per Person:</p>
            <p class='tooltip-text'>${format("$,.3r")(DonatedPerPerson)}</p></div>
            <div class=${getMedianIncomeClass(medianIncome)}> <p class='tooltip-header'>Median Income:</p>
            <p class='tooltip-text'>${format("$,")(medianIncome)}</p></div> `)

}

const Layers = () => {
    

    return (
      <>
        <LayersControl position="topright" collapsed={false}>
         <LayersControl.BaseLayer checked name="Total Donated">
            <GeoJSON  data = {census_tracts} style={(f)=>getTotalDonatedStyle(f)} onEachFeature={getToolTips} >
                </GeoJSON>
            </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Donated Per Person">
            <GeoJSON  data = {census_tracts} style={(f)=>getPerPersonStyle(f)} onEachFeature={getToolTips} >
                </GeoJSON> 
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Median Income">
             <GeoJSON  data = {census_tracts} style={(f)=>getMedianIncomeStyle(f)} onEachFeature={getToolTips} >
                </GeoJSON> 
          </LayersControl.BaseLayer>
        </LayersControl>
      </>
    )
  }
  
  export {Layers};