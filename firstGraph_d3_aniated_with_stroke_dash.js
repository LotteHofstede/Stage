function drawGraph() {

    var svgContainer = d3.select("svg");
    var lineFunction = d3.svg.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .interpolate("basis");
    var lineGraph = svgContainer.append("path").attr("d", lineFunction(lineData));
    var totalLength = lineGraph.node().getTotalLength();

    lineGraph.attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .ease("linear")
        .attr("stroke-dashoffset", 0)
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none");
}


var lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
                 { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
                 { "x": 80,  "y": 5},  { "x": 100, "y": 60}];