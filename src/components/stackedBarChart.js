import React from 'react'
import * as d3 from 'd3'
import { colors } from '../style/colors';
import top20total_recipients from '../data/top20_total_recipients.csv'

class StackedBarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            margins: { top: 70, bottom: 20, left: 500, right: 20 },
            format: d3.format(",." + d3.precisionFixed(1) + "f"),
            data: []
        }
    }

    getColor(d){
        if (d === 'Lowest Income'){
            return colors.green1
        }
        if (d === 'Low Income'){
            return colors.green2
        }
        if (d === 'Middle Income'){
            return colors.green3
        }
        if (d === 'High Income'){
            return colors.green4
        }
        if (d === 'Highest Income'){
            return colors.green5
        }
    }
    getTotal(d){
        let keys = this.state.data.columns.slice(1).reverse()
        let total=0.0
        for (const key of keys){
            total = total + parseFloat(d[key])
        }
        return total
    }

    drawStackedBar(){
        let keys = this.state.data.columns.slice(1).reverse()
        this.state.data.forEach(d => d.total = this.getTotal(d))
        let stack = d3
              .stack()
              .keys(keys)
              (this.state.data)
              .map(d => (d.forEach(v => v.key = d.key), d))
        let div = d3.select("body").append("div")	
              .attr("class", "bar-tooltip")				
              .style("opacity", 0);
        let yScale = d3
            .scaleBand()
            .domain(this.state.data.map((d)=>d[this.props.yAxisAttribute]))
            .range([this.state.margins.top,this.props.height-this.state.margins.bottom])
            .padding(0.3)
        let xScale = d3
            .scaleLinear()
            .domain([0,16200000])
            .range([this.state.margins.left, this.props.width - this.state.margins.right]);
        let bardiv = d3.selectAll("."+this.props.barClass).append("div")
            .attr("class", "barchart")
            .append("svg")
            .attr("width", this.props.width)
            .attr("height", this.props.height)
            
        bardiv.append("g")
            .selectAll("g")
            .data(stack)
            .join("g")
                .attr("fill", d =>this.getColor(d.key))
                .attr("data-legend",function(d) { return d.key})
            .selectAll("rect")
            .data(d=>d)
            .join("rect")
                .attr("x", (d) => xScale(d[0]))
                .attr("y", (d) => yScale(d.data[this.props.yAxisAttribute]))
                .attr("width", d => xScale(d[1]) - xScale(d[0]))
                .attr("height", yScale.bandwidth())
                .on('mouseover', function(e){
                    d3.select(this).style('opacity', 0.5)
                    d3.select(this).style('stroke-width',6)
                    div.transition()		
                        .duration(200)		
                        .style("opacity", .9);		
                    div.html(d3.format("$,d")(this.__data__[1]-this.__data__[0])+"<br/>"+d3.format(".2%")((this.__data__[1]-this.__data__[0])/this.__data__.data.total))	
                        .style("left", (e.pageX) + "px")		
                        .style("top", (e.pageY - 60) + "px");			
                 })
                .on('mouseout', function(){
                    d3.select(this).style('opacity', 1)
                    d3.select(this).style('stroke-width',1)
                    div.transition()		
                        .duration(500)		
                        .style("opacity", 0);	
                })
    

        const yAxis = d3.axisLeft(yScale).tickSize(1).tickPadding(10);
        const xAxis = d3.axisTop(xScale)
        bardiv.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(${xScale(this.state.margins.left)},0)`)
            .call(yAxis)
        
        bardiv.append("g")
            .attr("transform", `translate(0,${0 + this.state.margins.top})`)
            .call(xAxis.tickFormat((d) => d3.format("$,~s")(d)))

        bardiv.append("g")
            .attr("class","legend")
            .selectAll("rect")
            .data(keys.reverse())
            .join("rect")
                .attr("fill", d =>this.getColor(d))
                .attr("x", (d,i)=>15+(40*i+20*(i+1)))
                .attr("y",30)
                .attr("width",40)
                .attr("height",20)
         
        let offset = [15,100,155,220,255]
        bardiv.append("g")
            .selectAll("text")
            .data(['Lowest Income','Low','Middle','High','Highest Income'])
            .join("text")
                .attr("class","legend")
                .attr("x", (d,i)=>offset[i]+5)
                .attr("y",25)
                .attr("width",60)
                .attr("height",2)
                .text(d => d)
            

        
    }

    componentDidMount(){
        d3.csv(top20total_recipients).then((data)=>{
            this.setState({
                data:data
            })
            this.drawStackedBar()
        })
    }

    
    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
       return (
           <div>
            <div>{this.props.title}</div>
            <div className={this.props.barClass}></div>
           </div>
       )
    }
}


export {StackedBarChart}