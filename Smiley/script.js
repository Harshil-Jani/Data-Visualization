import * as d3 from "https://cdn.skypack.dev/d3@7";

const svg = d3.select('svg')
    .attr('width',2000)
    .attr('height',2000);
const face = svg.append('circle')
    .attr('r', 350)
    .attr('cx',770)
    .attr('cy',400)
    .attr('fill',"#fff34d")
    .attr('stroke','black');
;

const leftEye = svg.append('circle')
    .attr('r', 30)
    .attr('cx',650)
    .attr('cy',250)
    .attr('fill',"black")
;

const rightEye = svg.append('circle')
    .attr('r', 30)
    .attr('cx',900)
    .attr('cy',250)
    .attr('fill',"black")
;

const mouth = svg.append('path')
    .attr('d', d3.arc()({
        innerRadius: 280,
        outerRadius: 300,
        startAngle: Math.PI /2,
        endAngle: Math.PI * 3 / 2,
      }))
    .attr('transform',`translate(770,400)`)
;

