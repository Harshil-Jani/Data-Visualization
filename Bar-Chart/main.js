import * as d3 from "https://cdn.skypack.dev/d3@7";

const svg = d3.select('svg') 
.attr('width',window.innerWidth)
.attr('height',window.innerHeight);

const render = data => {                                   
    const xValue = d => d.Population;
    const yValue = d => d.Country;
    const margin = {
        top: 50,
        right:0,
        bottom:100,
        left:140
    }
    const xScale = d3.scaleLinear()
        .domain([0,d3.max(data, xValue)])
        .range([0,window.innerWidth-160]);   

    const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0,window.innerHeight-100])
        .padding(0.1);

    const xAxisTickFormat = number =>
        d3.format('.4s')(number)
        .replace('G','B');

    const yAxis = d3.axisLeft(yScale);
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickSize(-window.innerHeight/1.16);

    const g = svg.append('g')
        .attr('transform',`translate(${margin.left},${margin.top})`);
    
    g.append('g').call(yAxis);
    g.append('g').call(xAxis)
        .attr('transform',`translate(${0},${window.innerHeight-100})`);

    g.selectAll('rect').data(data)
        .enter().append('rect')
            .attr('y', d=> yScale(yValue(d)))
            .attr('width',d => xScale(xValue(d)))
            .attr('height',d => yScale.bandwidth());

    g.append('text')
        .text('Top 20 Countries Population')
        .attr('y','-10')
        .attr('font-weight','bold');
};

d3.csv('data.csv').then(data=>{
    data.forEach(d=>{
        d.Population = +d.Population;
    })
    render(data);
})