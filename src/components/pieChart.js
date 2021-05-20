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


        let color = (d)=>{
            if ((d.indexOf('Indiv') >= 0) || (d.indexOf('New York')>=0)){
                return colors.red3
            } else {
                return colors.grey
            }
        }
        
        let total = d3.sum(this.props.data,(d)=>d.value)
        this.props.data.forEach(d => d.total = total)
        const arcs = pie(this.props.data);
        // Define the div for the tooltip
        let div = d3.select("body").append("div")	
            .attr("class", "pie-tooltip")				
            .style("opacity", 0);
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
            .on('mouseover', function(e){
                d3.select(this).style('opacity', 0.5)
                d3.select(this).style('stroke-width',6)
                div.transition()		
                    .duration(200)		
                    .style("opacity", .9);		
                div.html(d3.format(".2%")(this.__data__.data.value/this.__data__.data.total))	
                    .style("left", (e.pageX) + "px")		
                    .style("top", (e.pageY - 28) + "px");			
             })
            .on('mouseout', function(){
                d3.select(this).style('opacity', 1)
                d3.select(this).style('stroke-width',1)
                div.transition()		
                    .duration(500)		
                    .style("opacity", 0);	
             })
            .append("title")
            .text(d => `${d.data.skill}: ${d.data.value.toLocaleString()}`)
            
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