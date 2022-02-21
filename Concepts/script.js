import * as d3 from "https://cdn.skypack.dev/d3@7";

const svg = d3.select('svg')
    .attr('height',window.innerHeight)
    .attr('width',window.innerWidth);

    svg.append('rect')
       .attr('x',1000)
       .attr('y',50)
       .attr('width',400)
       .attr('height',100)
       .attr('ry',50);
       
    svg.append('rect')
       .attr('x',1000)
       .attr('y',200)
       .attr('width',400)
       .attr('height',100)
       .attr('ry',50);
    
    svg.append('rect')
       .attr('x',1000)
       .attr('y',350)
       .attr('width',400)
       .attr('height',100)
       .attr('ry',50);

    svg.append('rect')
       .attr('x',1000)
       .attr('y',500)
       .attr('width',400)
       .attr('height',100)
       .attr('ry',50);
    
    svg.append('rect')
       .attr('x',1000)
       .attr('y',650)
       .attr('width',400)
       .attr('height',100)
       .attr('ry',50);
///////////////////////////////////////////////////
    svg.append('rect')
       .attr('x',500)
       .attr('y',75)
       .attr('width',400)
       .attr('height',300)
       .attr('ry',50);

    svg.append('rect')
       .attr('x',500)
       .attr('y',425)
       .attr('width',400)
       .attr('height',300)
       .attr('ry',50);
/////////////////////////////////////////////////////
    svg.append('rect')
       .attr('x',10)
       .attr('y',150)
       .attr('width',400)
       .attr('height',500)
       .attr('ry',50);
////////////////////////////////////////////////////
    svg.append('text')
        .text("Data")
        .attr('x',150)
        .attr('y',375)
        .attr('fill','white')
        .attr('font-size','300%')
        .attr('font-weight','bold');

    svg.append('text')
        .text("Visualization")
        .attr('x',40)
        .attr('y',425)
        .attr('fill','white')
        .attr('font-size','300%')
        .attr('font-weight','bold');
////////////////////////////////////////////////////
    svg.append('text')
        .text("Data")
        .attr('x',635)
        .attr('y',235)
        .attr('fill','white')
        .attr('font-size','300%')
        .attr('font-weight','bold');

    svg.append('text')
        .text("Visualization")
        .attr('x',535)
        .attr('y',590)
        .attr('fill','white')
        .attr('font-size','300%')
        .attr('font-weight','bold');
////////////////////////////////////////////////////
    svg.append('text')
        .text("CSV")
        .attr('x',1140)
        .attr('y',120)
        .attr('fill','white')
        .attr('font-size','300%')
        .attr('font-weight','bold');

    svg.append('text')
        .text("SVG")
        .attr('x',1140)
        .attr('y',270)
        .attr('fill','white')
        .attr('font-size','300%')
        .attr('font-weight','bold');
        
    svg.append('text')
        .text("D3.JS")
        .attr('x',1120)
        .attr('y',415)
        .attr('fill','white')
        .attr('font-size','300%')
        .attr('font-weight','bold');

    svg.append('text')
        .text("Graphs")
        .attr('x',1100)
        .attr('y',565)
        .attr('fill','white')
        .attr('font-size','300%')
        .attr('font-weight','bold');

    svg.append('text')
        .text("Maps")
        .attr('x',1125)
        .attr('y',715)
        .attr('fill','white')
        .attr('font-size','300%')
        .attr('font-weight','bold');
////////////////////////////////////////////
    svg.append('line')
        .attr('x1',410)
        .attr('x2',500)
        .attr('y1',400)
        .attr('y2',200)
        .style('stroke','red')
        .style('stroke-width',5)

    svg.append('line')
        .attr('x1',410)
        .attr('x2',500)
        .attr('y1',400)
        .attr('y2',600)
        .style('stroke','red')
        .style('stroke-width',5)

    svg.append('line')
        .attr('x1',1005)
        .attr('x2',900)
        .attr('y1',120)
        .attr('y2',225)
        .style('stroke','red')
        .style('stroke-width',5)

    svg.append('line')
        .attr('x1',1000)
        .attr('x2',900)
        .attr('y1',250)
        .attr('y2',225)
        .style('stroke','red')
        .style('stroke-width',5)

    svg.append('line')
        .attr('x1',1000)
        .attr('x2',900)
        .attr('y1',700)
        .attr('y2',575)
        .style('stroke','red')
        .style('stroke-width',5)

    svg.append('line')
        .attr('x1',1000)
        .attr('x2',900)
        .attr('y1',550)
        .attr('y2',575)
        .style('stroke','red')
        .style('stroke-width',5)

    svg.append('line')
        .attr('x1',410)
        .attr('x2',1000)
        .attr('y1',400)
        .attr('y2',400)
        .style('stroke','blue')
        .style('stroke-width',5)