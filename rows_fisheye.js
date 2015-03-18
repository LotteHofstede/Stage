  
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

var lineData2 = [ { "x": 0,   "y": 4},  { "x": 10,  "y": 0},
                 { "x": 20,  "y": 50}, { "x": 40,  "y": 65},
                 { "x": 50,  "y": 40},  { "x": 60, "y": 13},
                 { "x": 70,  "y": 12},  { "x": 80,  "y": 66},
                 { "x": 90,  "y": 0}, { "x": 100,  "y": 34},
                 { "x": 110,  "y": 32},
                 { "x": 120,  "y": 43}, { "x": 140,  "y": 7},
                 { "x": 150,  "y": 25},  { "x": 160, "y": 56},
                 { "x": 170,  "y": 19},  { "x": 180,  "y": 23},
                 { "x": 190,  "y": 70}, { "x": 200,  "y": 50}];

var lineData3 = [ { "x": 0,   "y": 49},  { "x": 10,  "y": 34},
                 { "x": 20,  "y": 14}, { "x": 40,  "y": 54},
                 { "x": 50,  "y": 54},  { "x": 60, "y": 13},
                 { "x": 70,  "y": 35},  { "x": 80,  "y": 54},
                 { "x": 90,  "y": 14}, { "x": 100,  "y": 30},
                 { "x": 110,  "y": 49},
                 { "x": 120,  "y": 1}, { "x": 140,  "y": 8},
                 { "x": 150,  "y": 0},  { "x": 160, "y": 40},
                 { "x": 170,  "y": 40},  { "x": 180,  "y": 5},
                 { "x": 190,  "y": 14}, { "x": 200,  "y": 53}];

var lineData4 = [ { "x": 0,   "y": 67},  { "x": 10,  "y": 34},
                 { "x": 20,  "y": 56}, { "x": 40,  "y": 54},
                 { "x": 50,  "y": 3},  { "x": 60, "y": 25},
                 { "x": 70,  "y": 43},  { "x": 80,  "y": 54},
                 { "x": 90,  "y": 1}, { "x": 100,  "y": 25},
                 { "x": 110,  "y": 43},
                 { "x": 120,  "y": 14}, { "x": 140,  "y": 65},
                 { "x": 150,  "y": 43},  { "x": 160, "y": 43},
                 { "x": 170,  "y": 76},  { "x": 180,  "y": 24},
                 { "x": 190,  "y": 84}, { "x": 200,  "y": 14}];

(function() {
  d3.fisheye = {
    scale: function(scaleType) {
      return d3_fisheye_scale(scaleType(), 5, 40);
    }
  };

  function d3_fisheye_scale(scale, d, a) {

    function fisheye(_) {
      var x = scale(_),
          left = x < a,
          v,
          range = d3.extent(scale.range());
          var min = range[0];
          var max = range[1];
          var m = left ? a - min : max - a;
      if (m == 0) m = max - min;
      
      return (left ? -1 : 1) * m * (d + 1) / (d + (m / Math.abs(x - a))) + a;
        
    }
      
  
    fisheye.focus = function(_) {
      if (!arguments.length) return a;
      a = +_;
      return fisheye;
    };

    return d3.rebind(fisheye, scale, "domain", "range");
  }
})();







  var xFisheye = d3.fisheye.scale(d3.scale.identity).domain([0, d3.max(lineData, function(d) { return d.x; })]).range([0,600]).focus(300);



 function d3js(factorHeight) {   // Set up variables
  var iniH = d3.select(".row").style("height");
  var newH = factorHeight?(factorHeight * iniH.substring(0,iniH.length-2) + "px"):iniH;
    var el, parentWrap, otherWrap, 
        allTitles = d3.selectAll(".row").style(
            'cursor', 'pointer' // make it seem clickable
        );
  
    d3.select('#accordion').selectAll('.row').on('click', function() {
        var el = this;
        if (!el.classList.contains("current")) {
            var objects = d3.selectAll(".row");
            objects.transition().duration(500).style('height', function() {
                if (this === el) { 
                    update(this, newH); return newH; 
                } else {
                    update(this, iniH); return iniH;
                }});
            objects.classed('current', function() {return (this === el) ? true : false});
            selected = d3.select(".row");
        }
        
    });
    
}


function update(row, rowHeight) {
    rowHeight = rowHeight.substring(0, rowHeight.length-2);
    var svgs = d3.select(row).selectAll("svg");
    svgs.each(function() {updateLine(false, d3.select(this), rowHeight);});
}

var xScale;
var yScale;
var lineFunction = d3.svg.line().x(function(d) {
                return xFisheye(d.x);
           }).y(function(d) {
                return yScale(d.y);
           })
    .interpolate("step-before");


function drawGraph(svgId, dataSet) {

    var svgContainer = d3.select(svgId);

    var width = svgContainer.style('width'); width = width.substring(0, width.length-2);
    var height = svgContainer.style('height'); height = height.substring(0, height.length-2);

    //Create scale functions
    //xScale = d3.scale.linear()
    //    .domain([0, d3.max(dataSet, function(d) { return d.x; })])
    //    .range([0, width]);

    yScale = d3.scale.linear()
        .domain([0, d3.max(dataSet, function(d) { return d.y; })])
        .range([height, 0]);

    //lineGraph.attr("height", 100);
    lines = svgContainer.selectAll(".line")
      .data([dataSet]); // needs to be an array (size of 1 for our data) of arrays

    lines.enter()
    .append("path")
    .attr("class", "line")
    .attr("d", lineFunction(dataSet));

    var colorStops = [["0%", "red"], ["50%", "crimson"], ["100%", "orange"]]
    addHorizontalGradient(svgContainer, colorStops);
    updateLine(true, svgContainer, height);

    var totalLength = lines.node().getTotalLength();
        lines.attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(1000)
            .ease("linear")
            .attr("stroke-dashoffset", 0)
            .attr("stroke", "url(#gradient)")
            .attr("stroke-width", 2)
            .attr("fill", "none");

}


function updateLine(init, svgContainer, height) {
    var lines = svgContainer
    .selectAll(".line");
    yScale.range([height, 0]);

    lines.transition()
          .duration(500)
          .attr("d", function(d) {return (lineFunction(d));});
    if (!init) {
            lines.attr("stroke-dasharray", 0 + " " + 0);
    }


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

var lineData2 = [ { "x": 0,   "y": 4},  { "x": 10,  "y": 0},
                 { "x": 20,  "y": 50}, { "x": 40,  "y": 65},
                 { "x": 50,  "y": 40},  { "x": 60, "y": 13},
                 { "x": 70,  "y": 12},  { "x": 80,  "y": 66},
                 { "x": 90,  "y": 0}, { "x": 100,  "y": 34},
                 { "x": 110,  "y": 32},
                 { "x": 120,  "y": 43}, { "x": 140,  "y": 7},
                 { "x": 150,  "y": 25},  { "x": 160, "y": 56},
                 { "x": 170,  "y": 19},  { "x": 180,  "y": 23},
                 { "x": 190,  "y": 70}, { "x": 200,  "y": 50}];

var lineData3 = [ { "x": 0,   "y": 49},  { "x": 10,  "y": 34},
                 { "x": 20,  "y": 14}, { "x": 40,  "y": 54},
                 { "x": 50,  "y": 54},  { "x": 60, "y": 13},
                 { "x": 70,  "y": 35},  { "x": 80,  "y": 54},
                 { "x": 90,  "y": 14}, { "x": 100,  "y": 30},
                 { "x": 110,  "y": 49},
                 { "x": 120,  "y": 1}, { "x": 140,  "y": 8},
                 { "x": 150,  "y": 0},  { "x": 160, "y": 40},
                 { "x": 170,  "y": 40},  { "x": 180,  "y": 5},
                 { "x": 190,  "y": 14}, { "x": 200,  "y": 53}];

var lineData4 = [ { "x": 0,   "y": 67},  { "x": 10,  "y": 34},
                 { "x": 20,  "y": 56}, { "x": 40,  "y": 54},
                 { "x": 50,  "y": 3},  { "x": 60, "y": 25},
                 { "x": 70,  "y": 43},  { "x": 80,  "y": 54},
                 { "x": 90,  "y": 1}, { "x": 100,  "y": 25},
                 { "x": 110,  "y": 43},
                 { "x": 120,  "y": 14}, { "x": 140,  "y": 65},
                 { "x": 150,  "y": 43},  { "x": 160, "y": 43},
                 { "x": 170,  "y": 76},  { "x": 180,  "y": 24},
                 { "x": 190,  "y": 84}, { "x": 200,  "y": 14}];
d3js(5);
drawGraph("#svg", lineData);

drawGraph("#test", lineData2);

drawGraph("#test2", lineData3);

drawGraph("#test3", lineData4);





(function cont() {
 // console.clear()
  
  var svg = d3.select("#cont").select("svg");
  svg.selectAll(".line").data(lineData);
  svg.on("mousemove", function() {
    var mouse = d3.mouse(this);
    xFisheye.focus(mouse[0]);       
    yScale(mouse[1]);
    redraw();
  });

  function redraw() {
    //var height = svgContainer.style('height'); height = height.substring(0, height.length-2);
    updateFishEye(false, svg);
   // var lines = svg
   //   .selectAll(".line");
  /*      lines.transition()
          .duration(500)
          .attr("d", function(d) {return (lineFunction(d));});*/
  }
})();


function updateFishEye(init, svgContainer) {
    var lines = svgContainer
      .selectAll(".line");
    lines.transition()
          .duration(50)
          .attr("d", function(d) {return (lineFunction(d));});
    if (!init) {
            lines.attr("stroke-dasharray", 0 + " " + 0);
    }


}
