import * as d3 from "https://cdn.skypack.dev/d3@7";

const svg = d3.select('svg');
const face = svg.append('circle')
    .attr('r', window.innerHeight/2 - 10)
    .attr('cx',window.innerWidth/2)
    .attr('cy',window.innerHeight/2)
    .attr('fill',"#fff34d")
    .attr('stroke','black');
;

const leftEye = svg.append('circle')
    .attr('r', 30)
    .attr('cx',window.innerWidth/2-150)
    .attr('cy',window.innerHeight/2-150)
    .attr('fill',"black")
;

const rightEye = svg.append('circle')
    .attr('r', 30)
    .attr('cx',window.innerWidth/2 +150)
    .attr('cy',window.innerHeight/2-150)
    .attr('fill',"black")
;

const mouth = svg.append('path')
    .attr('d', d3.arc()({
        innerRadius: 280,
        outerRadius: 300,
        startAngle: Math.PI /2,
        endAngle: Math.PI * 3 / 2,
      }))
    .attr('transform',`translate(${window.innerWidth/2},${window.innerHeight/2})`)
;

