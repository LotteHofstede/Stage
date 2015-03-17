var lineFunction = d3.svg.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; }).interpolate("basis");

function drawGraph() {
    var svgContainer = d3.select("svg");
    var lineGraph = svgContainer.append("path")
        .attr('class', 'line')
        .attr('d', lineFunction(lineData[0]))
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none").transition()
        .duration(2000)
        .attrTween('d', pathTween);
}


var lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
                 { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
                 { "x": 80,  "y": 5},  { "x": 100, "y": 60}];

function pathTween() {
    var interpolate = d3.scale.quantile()
            .domain([0,1])
            .range(d3.range(1, lineData.length + 1));
    return function(t) {
        return lineFunction(lineData.slice(0, interpolate(t)));
    };
}