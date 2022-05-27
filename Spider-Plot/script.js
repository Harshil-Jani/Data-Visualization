import * as d3 from "https://cdn.skypack.dev/d3@7";

const margin = {
    top : 10,
    right : 10,
    bottom : 10,
    left : 10
}

const width = 1000-margin.left-margin.right;
const height = 800-margin.top-margin.bottom;

const svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height);

const render =  data => {
    const radialScale = d3.scaleLinear()
                          .domain([0,10])
                          .range([0,250]);
    
    const ticks = [2,4,6,8,10];
    ticks.forEach(t => 
        svg.append('circle')
           .attr('cx',400)
           .attr('cy',400)
           .attr('fill','none')
           .attr('stroke','gray')
           .attr('r',radialScale(t))
    );
    ticks.forEach(t => 
        svg.append("text")
        .attr('x',415)
        .attr('y',395-radialScale(t))
        .text(t.toString())    
    );
    
   

    const field = data.columns;
    const temp = data[0]
    //console.log(temp);
    const total_fields = data.columns.length;
    //console.log(data.columns.length);
    let total_numeric_fields = 0;
    for(let i=0; i<total_fields; i++){
        if(typeof(Object.values(temp)[i]) =="number"){
            total_numeric_fields++;
        }
    }
    const angleToCoordinate = (angle, value) => {
        let x = Math.cos(angle) * radialScale(value);
        let y = Math.sin(angle) * radialScale(value);
        return {
            "x" : 400 + x,
            "y" : 400 - y
        };
    }
    // console.log(total_numeric_fields);
    for(let i=0; i<total_fields; i++){
        const temp1 = Object.values(temp)[i];
        if(typeof(temp1)=="number"){
        // console.log(typeof(field[i]));
        let name = field[i];
        let angle = (Math.PI/2) + (2 * Math.PI * i / total_numeric_fields);
        let line_coordinate = angleToCoordinate(angle, 10);
        let label_coordinate = angleToCoordinate(angle ,12.5);

        svg.append('line')
           .attr('x1',400)
           .attr('y1',400)
           .attr('x2',line_coordinate.x)
           .attr('y2',line_coordinate.y)
           .attr('stroke','black');
        
        svg.append('text')
           .attr('x',label_coordinate.x)
           .attr('y',label_coordinate.y)
           .text(name);
    }
    }

    let line = d3.line();
    let colors = ["darkorange", "gray", "navy"];
    
    const getPathCoordinates = data_points => {
        let coordinates = [];
        for(let i=0; i<total_fields; i++){
            const temp1 = Object.values(temp)[i];
            if(typeof(temp1)=="number"){
            // console.log(typeof(field[i]));
            let name = field[i];
            let angle = (Math.PI/2) + (2 * Math.PI * i / total_numeric_fields);
            console.log(data_points[name])
           coordinates.push(angleToCoordinate, data_points[name]);
        }
        }
        return coordinates;
    }
    
    let points = [[400,400-250*0.9185],[400+0.134*250,400],[400,400+250*0.214],[400-0.245*250,400]];
    for(let i=0; i<1; i++){
        let d = data[i];
        let color = colors[i];
        let coordinates = getPathCoordinates(d);
        console.log(coordinates);
        let numeric_coordinates = [];
        for(let j=0; j<=total_fields; j++){
            if(typeof(coordinates[j])=="number"){
                numeric_coordinates.push(coordinates[j]);
                console.log(coordinates[j]);
            };
        }
        console.log(numeric_coordinates);
        // console.log(line);
        //Incomplete function, I was unable to pass the parameters in attr("d",line) to svg-> Path.
        // Need some serious brainstorming around this fxn.
        
    }
    svg.append("circle").attr('r',5).attr('cx',400).attr('cy',400);
    svg.append("circle").attr('r',5).attr('cx',400).attr('cy',400-250*0.9185);
    svg.append("circle").attr('r',5).attr('cx',400+0.134*250).attr('cy',400);
    svg.append("circle").attr('r',5).attr('cx',400-0.245*250).attr('cy',400);
    svg.append("circle").attr('r',5).attr('cx',400).attr('cy',400+250*0.214);
    svg.append("path")
    .attr("d",line(points))
    .attr("stroke-width", 3)
    .attr("stroke", "orange")
    .attr("fill", "darkorange")
    .attr("stroke-opacity", 1)
    .attr("opacity", 0.5);
}

d3.csv('geant4.csv').then(data => {
    data.forEach(d => {
        d.dso = new String(d.dso);
        d.symbol = new String(d.symbol);
        d.cycles = +d.cycles / 100000000000;
        d.instructions = +d.instructions / 1000000000000;
        d.branches = +d.branches / 100000000000;
        d.branch_misses = +d.branch_misses / 1000000000;
    });
    render(data);
})

