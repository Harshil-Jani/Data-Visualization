import * as d3 from "https://cdn.skypack.dev/d3@7";

const margin = {
    top : 10,
    right : 10,
    bottom : 30,
    left : 10
}

const width = 1000-margin.left-margin.right;
const height = 95-margin.top-margin.bottom;
const values = [];

const svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height);

const render =  data => {
    
    console.log(values);
    const barwidth = 20;
    
    const x = d3.scaleLinear()
            .domain([0,10])
            .range([0,width]);

    const xAxis = d3.axisBottom(x);

    const bar = svg.selectAll(".bar").data(values)
                .enter()
                .append("g")
                .attr("class","bar")
                .attr("transform", d=>"translate("+x(d)+",0)");
    
    bar.append("rect")
        .attr("x",-barwidth/2)
        .attr("width",barwidth)
        .attr("height",50)
        .style("opacity",0.1);

    svg.append("g")
        .attr("class","x axis")
        .attr("transform",`translate(0,${height})`)
        .call(xAxis);
}

d3.csv('geant4.csv').then(data => {
    data.forEach(d => {
        d.dso = new String(d.dso);
        d.symbol = new String(d.symbol);
        d.cycles = +d.cycles / 1000000000;
        d.instructions = +d.instructions / 1000000000;
        d.branches = +d.branches / 1000000000;
        d.branch_misses = +d.branch_misses / 1000000000;
        values.push(d.cycles/100);
    });
    render(data);
})

