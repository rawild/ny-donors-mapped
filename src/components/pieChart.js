import * as d3 from 'd3'
import React from 'react';
import {colors} from '../style/colors.js'

class PieChart extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }
   

    drawChart() {
        let width = this.props.width,
            height = this.props.height,
            radius= Math.min(this.props.width, this.props.height) / 2 * 0.8
        //get functions need for drawing the chart
        let pie = d3.pie()
            .sort(null)
            .value(d => d.value)
        let arc = d3.arc()
            .innerRadius(0)
            .outerRadius(Math.min(width, height) / 2 - 1)
        let arcLabel =  d3.arc().innerRadius(radius).outerRadius(radius);
        console.log(arcLabel)
        /*let color = d3.scaleOrdinal()
            .domain(this.props.data.map(d => d.name))
            .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), this.props.data.length).reverse())*/
        let color = (d)=>{
            if (d.indexOf('Indiv') >= 0){
                return colors.red3
            } else {
                return colors.grey
            }
        }
        const arcs = pie(this.props.data);
        // append the svg object to the body of the page
        let svg = d3.select("."+this.props.pieClass)
                .append("svg")
                .attr("height", this.props.height)
                .attr("width", this.props.width)
                .attr("viewBox", [-width / 2, -height / 2, width, height]);

        svg.append("g")
            .attr("stroke", "white")
            .selectAll("path")
            .data(arcs)
            .join("path")
            .attr("fill", d => color(d.data.name))
            .attr("d", arc)
            .append("title")
            .text(d => `${d.data.skill}: ${d.data.value.toLocaleString()}`);
        // Add Labels
        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(arcs)
            .join("text")
            .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
            .call(text => text.append("tspan")
                .attr("y", "-0.4em")
                .attr("font-weight", "bold")
                .text(d => d.data.name))
            .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
                .attr("x", 0)
                .attr("y", "0.7em")
                .attr("fill-opacity", 0.7)
                .text(d => this.props.format?d3.format(this.props.format)(d.data.value):d.data.value.toLocaleString()));
        }
        
        componentDidMount() {
            this.drawChart();
        }

        render(){
        
            return (
            <div>
                <div className='chart-title'>{this.props.title}</div>
                <div className={this.props.pieClass}></div>
            </div>)
        }
}

export {PieChart}