import * as d3 from 'd3'
import React from 'react';
import {colors} from '../style/colors.js'

class BarChart extends React.Component {
    constructor(props) {
        super(props);
    }
    drawBar() {
        let margin = {top: 20, right: 30, bottom: 40, left: 195},
                    width = this.props.width - margin.left - margin.right,
                    height = this.props.height - margin.top - margin.bottom;
        // append the svg object to the body of the page
        d3.selectAll("."+this.props.barClass).selectAll("svg").remove()
        let svg = d3.selectAll("."+this.props.barClass)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        // Add X axis
        let x = d3.scaleLinear()
                .domain([0, d3.max(this.props.data.map((d)=>parseFloat(d[this.props.xAxisAttribute])))])
                .range([ 0, width])
       
        svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .attr('class','axis x')
                .call(d3.axisBottom(x).tickFormat((d) => d3.format("$,~s")(d)))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");
        // Add Y axis
        let y = d3.scaleBand()
                .range([ 0, height ])
                .domain(this.props.data.map((d) =>  d[this.props.yAxisAttribute]))
                .padding(.1);
      
        
        // Add Bars
        svg.selectAll("myRect")
                .data(this.props.data)
                .enter()
                .append("rect")
                .on('mouseover', function(){
                    d3.select(this).style('opacity', 0.5)
                 })
                .on('mouseout', function(){
                    d3.select(this).style('opacity', 1)
                 })
                .attr("x", x(0) )
                .attr("y", (d) => y(d[this.props.yAxisAttribute]))
                .attr("width", 0)
                .attr("height", y.bandwidth() -10 )
                .attr("fill", this.props.fillColor)
                .transition(d3.transition().duration(1000))
                .attr("width", (d) => x(parseFloat(d[this.props.xAxisAttribute])))
        
        svg.append("g")
                .attr('class','axis y')
                .call(d3.axisLeft(y).tickSize(0))
                .selectAll("text")
                .attr("dy", null)

        svg.append("line")
                .attr("x1", x(67981586))
                .attr("y1", 0)
                .attr("x2", x(67981586))
                .attr("y2", height)
                .style("stroke-width", 1.5)
                .style("stroke", colors.grey2)
                .style("fill", "none");
        svg.append("text")
                 .attr("x",x(67981586)/1.25)
                 .attr("y",-2)
                 .attr("class","percent-label")
                 .text("20% of the money")
                 
        }
        componentDidMount(){
                this.drawBar()
        }
        componentDidUpdate() {
                this.drawBar()
        }
        render(){
            return (<div>
                        <div className='chart-title'>{this.props.title}</div>
                        <div className='spacer' />
                        <div className={this.props.barClass}></div>
                    </div>)
        
        }
}

export {BarChart}