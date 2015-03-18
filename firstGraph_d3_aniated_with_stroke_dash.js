function drawGraph(data) {
    var width = 400;
    var height = 100;
//Create scale functions
    var xScale = d3.scale.linear()
        .domain([0, d3.max(lineData, function(d) { return d.x; })])
        .range([0, width]);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(lineData, function(d) { return d.y; })])
        .range([height, 0]);

    var svgContainer = d3.select("svg");
    var lineFunction = d3.svg.line().x(function(d) {
                    return xScale(d.x);
               }).y(function(d) {
                    return yScale(d.y);
               })
        .interpolate("step-before");
    var lineGraph = svgContainer.append("path").attr("d", lineFunction(lineData));
    var totalLength = lineGraph.node().getTotalLength();

    var colorStops = [["0%", "red"], ["50%", "crimson"], ["100%", "orange"]]
    addHorizontalGradient(svgContainer, colorStops);


    lineGraph.attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .ease("linear")
        .attr("stroke-dashoffset", 0)
        .attr("stroke", "url(#gradient)")
        .attr("stroke-width", 2)
        .attr("fill", "none");
}


function addHorizontalGradient(svg, stops) {
    var gradient = svg.append("svg:defs")
      .append("svg:linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%") //gradient direction :)
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%")
        .attr("spreadMethod", "pad");
    stops.forEach(function(entry) {
        gradient.append("svg:stop")
        .attr("offset", entry[0])
        .attr("stop-color", entry[1])
        .attr("stop-opacity", 1);
    });
}


var lineData = [ { "x": 0,   "y": 5},  { "x": 10,  "y": 20},
                 { "x": 20,  "y": 10}, { "x": 40,  "y": 40},
                 { "x": 50,  "y": 5},  { "x": 60, "y": 60},
                 { "x": 70,  "y": 5},  { "x": 80,  "y": 20},
                 { "x": 90,  "y": 10}, { "x": 100,  "y": 40},
                 { "x": 110,  "y": 20},
                 { "x": 120,  "y": 10}, { "x": 140,  "y": 40},
                 { "x": 150,  "y": 5},  { "x": 160, "y": 60},
                 { "x": 170,  "y": 5},  { "x": 180,  "y": 20},
                 { "x": 190,  "y": 10}, { "x": 200,  "y": 40}];

drawGraph(lineData);