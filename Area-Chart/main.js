import * as d3 from "https://cdn.skypack.dev/d3@7";

const svg = d3.select('svg') 
.attr('width',1200)
.attr('height',550);

const render = data => {                                   
    const title = "Delhi in Feb 2022";
    const margin = {top:60, right: 40, bottom: 88, left:105};
    const innerWidth = 1200 - margin.left - margin.right;
    const innerHeight = 550 - margin.top - margin.bottom;

    const xValue = d => d.timestamp;
    const xAxisLabel = 'Time';

    const yValue = d => d.temperature;
    const yAxisLabel = 'Temperature';
    const circleRadius = 6;

    const xScale = d3.scaleTime()
        .domain(d3.extent(data,xValue))
        .range([0,innerWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data,yValue))
        .range([innerHeight,0])
        .nice();

    const g = svg.append('g')
        .attr('transform',`translate(${margin.left},${margin.top})`);
    
    const xAxis = d3.axisBottom(xScale)
        .tickSize(innerHeight)
        .tickPadding(15);

    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10);

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform',`translate(0,${-innerHeight/60})`);
    xAxisG.select('.domain').remove();
    xAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', 450)
      .attr('x', innerWidth / 2)
      .attr('fill', 'black')
      .text(xAxisLabel);
    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();
    yAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', -60)
      .attr('x', -innerHeight/2)
      .attr('fill', 'black')
      .attr('transform', `rotate(-90)`)
      .attr('text-anchor', 'middle')
      .text(yAxisLabel);
    const lineGenerator = d3.line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(d3.curveBasis);

    g.append('path')
        .attr('class','line-path')
        .attr('d',lineGenerator(data));

    g.append('text')
        .attr('class','title')
        .attr('y',-10)
        .text(title);

};

d3.csv('data.csv').then(data=>{
    data.forEach(d=>{
        d.temperature = +d.temperature;
        d.timestamp = new Date(d.timestamp);
    });
    render(data);
});