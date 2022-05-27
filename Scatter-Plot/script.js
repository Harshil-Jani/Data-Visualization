import * as d3 from "https://cdn.skypack.dev/d3@7";
const width = 1000;
const height = 500;

const legend_div = d3.select('.legend')
const legend_activate = d3.select('.legend-active')
    .on("mouseover", () => {
        legend_div.style('display', 'block')
    })
    .on("mouseleave", () => {
        legend_div.style("display", 'none')
    })

const svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height);

const legend = d3.select(".legend")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("position", "absoulute")
    .html("<h2>Geant4 Libraries</h2>🟥libG4clhep | 🟩libG4geometry | 🟨libG4event | ⬛libG4particles | 🟫libG4processes | 🟦libG4track | 🟧libG4tracking | 🟪Others");

const ParameterMenu = (some_parameter, props) => {
    const {
        options,
        onOptionClicked,
        selectedOption
    } = props;

    let select = some_parameter.selectAll('select').data([null]);
    select = select.enter().append('select').merge(select)
        .on('change', function () {
            onOptionClicked(this.value);
        });

    const option = select.selectAll('option').data(options);
    option.enter().append('option').merge(option)
        .attr('value', d => {
            if(d!="comm" && d!="dso" && d!="symbol"){
                return d;
            }else{
                return "";
            }
        })
        .property('selected', d => d === selectedOption)
        .text(d =>{
            if(d!="comm" && d!="dso" && d!="symbol"){
                return d;
            }else{
                return "";
            }
        });
    
}

const scatterPlot = (parameters, props) => {
    const {
        xValue,
        xAxisLabel,
        yValue,
        yAxisLabel,
        margin,
        width,
        height,
        data
    } = props;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight, 0])
        .nice();

    const g = parameters.selectAll('.container').data([null]);
    const gEnter = g.enter().append('g').attr('class', 'container');
    gEnter.merge(g).attr('transform',
        `translate(${margin.left},${margin.top})`
    );
    
    const xAxisTickFormat = number => {
        if (typeof (number) == "number") {
            return number + 'B';
        }
        return number;
    };
    const yAxisTickFormat = number => {
        if (typeof (number) == "number") {
            return number + 'B';
        }
        return number;
    };

    const xAxis = d3.axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickSize(-innerHeight)
        .tickPadding(15);
    const yAxis = d3.axisLeft(yScale)
        .tickFormat(yAxisTickFormat)
        .tickSize(-innerWidth)
        .tickPadding(15);

    const xAxisG = g.select('.x-parameter');
    const xAxisGEnter = gEnter.append('g').attr('class', 'x-parameter')
    xAxisG.merge(xAxisGEnter).attr('transform', `translate(0,${innerHeight})`).call(xAxis);
    
    const yAxisG = g.select('.y-parameter');
    const yAxisGEnter = gEnter.append('g').attr('class', 'y-parameter')
    yAxisG.merge(yAxisGEnter).call(yAxis);

    const xAxisLabelText = xAxisGEnter.append('text')
        .attr('class', 'axis-label')
        .attr('fill', 'black')
        .attr('y', 75)
        .merge(xAxisG.select('.axis-label'))
        .attr('x', innerWidth / 2)
        .text(xAxisLabel);
    const yAxisLabelText = yAxisGEnter.append('text')
        .attr('class', 'axis-label')
        .attr('fill', 'black')
        .attr('y', -93)
        .attr('fill', 'black')
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .merge(yAxisG.select('.axis-label'))
        .attr('x', -innerHeight / 2)
        .text(yAxisLabel)

    const tooltip = d3.select(".tool")
        .style("opacity", 0)
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")

    const circles = g.merge(gEnter).selectAll('circle').data(data);
    circles.enter().append('circle').merge(circles)
        .attr('r', d => d.cycles / 100)
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('class', d => d.dso.slice(0, -3))
        .on("mouseover", (event, d) => {
            tooltip
                .style("opacity", 1)
        })
        .on("mousemove", (event, d) => {
            console.log(d);
            tooltip
                .html("DSO : " + d.dso + "<br>Symbol : " + d.symbol + "<br>Cycles : " + d.cycles + "B<br>Instructions : " + d.instructions + "B<br>Branches : " + d.branches + "B<br>Branch Misses : " + d.branch_misses + "B")
        })
        .on("mouseleave", (event, d) => {
            tooltip
                .transition()
                .duration(500)
                .style("opacity", 0)
        });
}

let data;
let XColumn;
let YColumn;
const onXColumnClicked = column => {
    XColumn = column;
    render();
}
const onYColumnClicked = column => {
    YColumn = column;
    render();
}

const render = () => {

    d3.select('#x-parameter').call(ParameterMenu, {
        options: data.columns,
        onOptionClicked: onXColumnClicked,
        selectedOption: XColumn
    });

    d3.select('#y-parameter').call(ParameterMenu, {
        options: data.columns,
        onOptionClicked: onYColumnClicked,
        selectedOption: YColumn
    });

    svg.call(scatterPlot, {
        title: "Something",
        xValue: d => d[XColumn],
        xAxisLabel: XColumn + " (in Billions)",
        yValue: d => d[YColumn],
        yAxisLabel: YColumn + " (in Billions)",
        margin: { top: 10, right: 40, bottom: 88, left: 150 },
        width,
        height,
        data
    });
}

d3.csv('geant4.csv').then(file_data => {
    data = file_data;
    data.forEach(d => {
        d.dso = new String(d.dso);
        d.symbol = new String(d.symbol);
        d.cycles = +d.cycles / 1000000000;
        d.instructions = +d.instructions / 1000000000;
        d.branches = +d.branches / 1000000000;
        d.branch_misses = +d.branch_misses / 1000000000;
    });
    XColumn = data.columns[3];
    YColumn = data.columns[4];
    render();
})
