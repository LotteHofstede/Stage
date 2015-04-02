	(function() {
	d3.fisheye = {
	scale: function(scaleType) {
	return d3_fisheye_scale(scaleType(), 3, 0);
	},
	circular: function() {
	var radius = 200,
	distortion = 2,
	k0,
	k1,
	focus = [0, 0];
	function fisheye(d) {
	var dx = d.x - focus[0],
	dy = d.y - focus[1],
	dd = Math.sqrt(dx * dx + dy * dy);
	if (!dd || dd >= radius) return {x: d.x, y: d.y, z: dd >= radius ? 1 : 10};
	var k = k0 * (1 - Math.exp(-dd * k1)) / dd * .75 + .25;
	return {x: focus[0] + dx * k, y: focus[1] + dy * k, z: Math.min(k, 10)};
	}
	function rescale() {
	k0 = Math.exp(distortion);
	k0 = k0 / (k0 - 1) * radius;
	k1 = distortion / radius;
	return fisheye;
	}
	fisheye.radius = function(_) {
	if (!arguments.length) return radius;
	radius = +_;
	return rescale();
	};
	fisheye.distortion = function(_) {
	if (!arguments.length) return distortion;
	distortion = +_;
	return rescale();
	};
	fisheye.focus = function(_) {
	if (!arguments.length) return focus;
	focus = _;
	return fisheye;
	};
	return rescale();
	}
	};
	function d3_fisheye_scale(scale, d, a) {
	function fisheye(_) {
	var x = scale(_),
	left = x < a,
	range = d3.extent(scale.range()),
	min = range[0],
	max = range[1],
	m = left ? a - min : max - a;
	if (m == 0) m = max - min;
	return (left ? -1 : 1) * m * (d + 1) / (d + (m / Math.abs(x - a))) + a;
	}
	fisheye.distortion = function(_) {
	if (!arguments.length) return d;
	d = +_;
	return fisheye;
	};
	fisheye.focus = function(_) {
	if (!arguments.length) return a;
	a = +_;
	return fisheye;
	};
	fisheye.copy = function() {
	return d3_fisheye_scale(scale.copy(), d, a);
	};
	fisheye.nice = scale.nice;
	fisheye.ticks = scale.ticks;
	fisheye.tickFormat = scale.tickFormat;
	return d3.rebind(fisheye, scale, "domain", "range");
	}
	})();




var xFisheye = d3.fisheye.scale(d3.scale.linear).domain([-3600, 86400-3600]).range([0,width]).focus(0);

var xScale;
var yScale;
	var xAxis = d3.svg.axis().orient("bottom").scale(xFisheye).tickSize(height,0,0).tickPadding(0).tickValues(d3.range(0, 86400, 3600)).tickFormat(function(d) {return d3.time.format("%H:%M")(getDate(d))});
	var yAxis;

	var lineFunction = d3.svg.line().x(function(d) { 
	                return xFisheye(dateToTime(d.x));
	           }).y(function(d) {
	                return yScale(d.y);
	           })
	    .interpolate("cardinal");

function loadPage(data) {
	var width = d3.select("#accordion").node().getBoundingClientRect().width;
	var height = d3.select("#accordion").node().getBoundingClientRect().height;



	var colorStops = [["0%", "red"], ["50%", "#FF8C00"], ["100%", "orange"]];

	var svgs = new Array();
	svgs["#svg"] = data[0];
	svgs["#test"] = data[1];

	svgs["#test2"] = data[2];


	for (var i = 3; i < amount; i++) {
		var str = "#test" + i;
		svgs[str] = data[i];
	} 

	for (var key in svgs) {
		if(typeof svgs[key] !== "undefined") {
			var svg = drawGraph(svgs[key], 'url("#gradient")');
			addHorizontalGradient(svg, colorStops);	
		}
	}
	d3js(factor);
	var axis = d3.select(".xaxis").select("svg").append("g").attr("class", "x axis").call(xAxis).selectAll("text").style("font-size", function(d) {return -(xFisheye(d)-xFisheye(d+3600))/5});
	axis.attr("dy", -5);
	generateVerticalBackgroundGradient(xFisheye(39600))

}



	function getDate(usec) {
		var d = new Date(0);
		d.setUTCSeconds(usec);
		return d;
	}



	 function d3js(factorHeight) {   // Set up variables
	  var iniH = rowHeight + "px";
	  var newH = factorHeight?(factorHeight * rowHeight + "px"):iniH;
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
	                    update(this, newH, true); return newH; 
	                } else {
	                    update(this, iniH, false); return iniH;
	                }}).each("end", function() {addXAxis(this, (this === el)); if(this === el) {loadPictures(); loadTweets(); }});
	            objects.classed('current', function() {return (this === el) ? true : false});
				d3.selectAll(".row").select(".instagram").remove();
				d3.selectAll(".row").select(".twitter").remove();
	        }
	        else {
	        	var path = d3.select('.current').select("svg").select("path");
	        	var gs = d3.select('.current').select(".instagram").selectAll("g");
	        	gs.each(function() {
	        		var el = d3.select(this);
	        		var image = el.select("image");
					var time = image.data()[0].time;
	        		var coord = getCoordinates(path, time);
	        		el.transition().duration(500).attr("transform", "translate("+coord.x+", 0)")
	        		
	        	});

	        	var gs = d3.select('.current').select(".twitter").selectAll(".twitterGroup");
	        	gs.each(function() {
	        		var el = d3.select(this);
	        		var rectG = el.select("g");
					var time = rectG.data()[0].time;
	        		var coord = getCoordinates(path, time);
	        		el.transition().duration(500).attr("transform", "translate("+coord.x+", 0)");
	        		
	        	});
	        	
	        }
	        
	    });
	    
	}

	function addXAxis(row, add) {

		var h = d3.select(row).style('height').slice(0, -2);
		yScale.range([h, 0]);
		var svgs = d3.select(row).selectAll(".graphs");
		if(add) {
			svgs.append("g").attr("class", "y axis").transition().duration(500).call(yAxis).selectAll("text").attr("x", "15px");
		} else {
			var axis = svgs.select('.axis');
			var text = axis.transition().duration(500).selectAll("text").attr("x", "-9px").each("end", function() {axis.remove()});
			//without "end" axis sometimes does not get removed because fast clicking disturbs the process
		}
	}

	function update(row, newRowHeight, expanded) {

	    newRowHeight = newRowHeight.substring(0, newRowHeight.length-2);
	    if (expanded) { newRowHeight -= 2*rowHeight};
	    var svgs = d3.select(row).selectAll(".graphs");
	    svgs.each(function() {updateLine(false, d3.select(this), newRowHeight, 500)});
	}

	function dateToTime(moment){
		var val = new Date(moment*1000);
		val.setHours(0,0,0);
		today = val.getTime()/1000;
		return moment-today-3600;
	}

	var index = 0;
	function drawGraph(dataSet, colorString) {
		var id = "svg" + index;
	    var svgContainer = d3.select("#accordion").insert("div", ":first-child").attr("class", "row").append("svg").attr("id", id).attr("class", "graphs");
	    index++;
	    svgContainer.call(svg);
	    svgContainer.append("g");
	    var width = svgContainer.style('width'); width = width.substring(0, width.length-2);
	    var height = rowHeight;

	    yScale = d3.scale.linear()
	        .domain([0, cmax(dataSet)])
	        .range([height, 0]);
	    var lines = svgContainer.select("g").selectAll(".line")
	      .data(dataSet); // needs to be an array (size of 1 for our data) of arrays
	    var i = 0;
	    lines.enter()
	    .append("path")
	    .attr("class", "line")
	    .attr("d", function() {return lineFunction(dataSet[i++])});

	    updateLine(true, svgContainer, height, 500);

	    var totalLength = lines.node().getTotalLength();
	        lines.attr("stroke-dasharray", totalLength + " " + totalLength)
	            .attr("stroke-dashoffset", totalLength)
	            .transition()
	            .duration(1000)
	            .ease("linear")
	            .attr("stroke-dashoffset", 0)
	            .attr("stroke", colorString) //url("#gradient") problem...
	            .attr("stroke-width", 2)
	            .attr("fill", "none");

	     yAxis = d3.svg.axis().orient("left").scale(yScale).ticks(5);
	     return svgContainer;

	}


	function updateLine(init, svgContainer, height, duration) {
		svgContainer.transition()
	          .duration(duration).style("height", height);
	    var lines = svgContainer.select("g").selectAll(".line");
		yScale.range([height, 0]);
		var data = lines.data();
		yScale.domain([0, cmax(data)]);

	    lines.transition()
	          .duration(duration)
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
	        .attr("x2", "0%")
	        .attr("y2", "100%")
	        .attr("spreadMethod", "pad");
	    stops.forEach(function(entry) {
	        gradient.append("svg:stop")
	        .attr("offset", entry[0])
	        .attr("stop-color", entry[1])
	        .attr("stop-opacity", 1);
	    });
	}

	var svg = function() {
	  
	  var svg = d3.selectAll(".row").selectAll(".graphs");
	  svg.on("click", function() {

	    var mouse = d3.mouse(this);
	    xFisheye.distortion(2.5).focus(mouse[0]);
	    updateFishEye();
	  });
	};


	function updateFishEye() {
	    var lines = d3.selectAll(".graphs").select("g")
	      .selectAll(".line");
	    lines.each(
	      function() {
	        var svg = d3.select(this.parentNode.parentNode);
	        var height = svg.style('height');height = height.substring(0, height.length-2);

	        updateLine(false, svg, height, 500); 
	      });

		var text = d3.select(".xaxis").select("svg").transition().duration(500).call(xAxis).selectAll("text").style("font-size", function(d) {return -(xFisheye(d)-xFisheye(d+3600))/5});
		d3.select(".xaxis").select("svg").selectAll("text").attr("dy", -5);

		moveBackgroundGradient(xFisheye(39600))
	}



	var global = false;
	var localMax;
	function switchScaling() {
		global = !global;
		var lines = d3.selectAll(".graphs").select("g")
	      .selectAll(".line");

	    lines.each(
	      function() {
	        var svg = d3.select(this.parentNode.parentNode)
	        var height = svg.style('height');height = height.substring(0, height.length-2);
	        updateLine(false, svg, height, 500); 
	      });
	    /*TODO
	    var maxHeight = rowHeight * (factor-2);

	    var twitterlines = d3.select(".current").selectAll("line");	    	
	    	var localmax = d3.select(".current").select(".line").node().getBBox().height;
	    	var difference = localmax/maxHeight;
	    	twitterlines.each(function() {

	    	console.log(difference);
	    	var el = d3.select(this);
	    	var y = el.attr("y2");
	    	y /= difference; 
	    	el.attr('y2', function() { return y; });
	    });*/
	   

	}

	

	var globalMaximum;
	function globalMax(data) {
		max = 0;
		for (var i = 0; i<data.length; i++) { 
			newMax = maxOfDatasets(data[i]);
			max=newMax>max?newMax:max;
		}
		return max;

	}

function getData() {

	var amount = window.innerHeight / 30;
	var url = document.URL + "/../request_data.php";
	var data = {"amount": amount};
	$.ajax({
		dataType: "json",
		url: url,
		type: 'get',
		data: data,
		success: function(datasets, status){readData(datasets);},
		error: function(xhr,desc,err){console.log(xhr); console.log('Details: ' + desc + '\nError: ' + err);}
	});
}

function readData(datasets) {
	var data = new Array();
	jQuery.each(datasets, function(i, day) {
		var dayArray = new Array();
		var twitter = new Array();
		var instagram = new Array();
		jQuery.each(day, function(j, val) {
			twitter.push({"x" : parseInt(val['time']), "y" : parseInt(val['count']) });
			instagram.push({"x" : parseInt(val['time']), "y" : parseInt(val['instagram']) });
		});

		dayArray.push(twitter);
		dayArray.push(instagram);
		data.push(dayArray);
	});
	globalMaximum = globalMax(data);
	loadPage(data);
}

function cmax(dataSet) {
		if (global) {
			return globalMaximum;
		}
		
		return maxOfDatasets(dataSet);

	}

function maxOfDatasets(dataSet) {
		var max = 0;
	    for (i = 0; i < dataSet.length; i++) {
	    	var c_max = d3.max(dataSet[i], function(d) { return d.y; });
	    	if (c_max > max) {
	    		max = c_max;
	    	}
	    }
	    return max
	}

function loadPictures() {
	var svg = d3.select(".current").select(".graphs");
	var date = new Date(svg.select("g").select("path").data()[0][0].x * 1000);

	var dateString = date.getFullYear()+"-"+("0" + (date.getMonth()+1)).slice(-2) +"-"+("0" + date.getDate()).slice(-2);
	var url = document.URL + "/../img_urls/"+ dateString + ".json";
	$.ajax({
		dataType: "json",
		url: url,
		type: 'get',
		success: function(urls, status){readUrls(urls, status);},
		error: function(xhr,desc,err){console.log(xhr); console.log('Details: ' + desc + '\nError: ' + err);}
	});
}

function readUrls(urls, status) {
	var currentRow = d3.select(".current");
	var svg = currentRow.append("div").attr("class", "instagram").append("svg");
	var path = currentRow.select("g").select("path");
	var maxHeight = rowHeight * (factor-2);
	jQuery.each(urls, function(i, url) {
		var coord = getCoordinates(path, url['time']);
		var g = svg.append('g').attr("transform", function(d) {return "translate("+coord.x+",0)"});
		var circle = g.append("circle").attr("cy", function() { return -(maxHeight-coord.y); }).attr("cx", 0).attr('r', 5).style("fill", "red");
		var line = g.append("line").attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', function() { return -(maxHeight-coord.y); }).style("stroke", "red");
		var image = g.append("image").data([url]).attr("id", "photo").attr("transform", function(d) {return "translate(-15,0)"});
		image.attr("xlink:href", function(d) {return d.url;}).attr("width",29).attr("height", 29);
		image.on("error", function() {
			d3.select(this).attr("xlink:href", "instagram.png");
		});
		image.on("mouseenter", function() {
			var img = d3.select(this);
			currentRow.select(".instagram").select("svg").style("z-index", "1");
			currentRow.select(".twitter").select("svg").style("z-index", "0");
			img.transition().duration(500).attr("width",100).attr("height", 100).attr("transform", function(d) {return "translate(-50,-35)"});
		});
		image.on("mouseleave", function() {
			var img = d3.select(this);
			img.transition().duration(500).attr("width",29).attr("height", 29).attr("transform", function(d) {return "translate(-15,0)"});
		});
		}); 

}

function getCoordinates(path, time) {
	var accuracy = 5;
	var left = path.node().offsetLeft;
	var x = xFisheye(dateToTime(time)) - left;
	var length = path.node().getTotalLength();
	for (i = x; i < length; i+=accuracy) {
		var pos = path.node().getPointAtLength(i);
		if (pos.x >= x) {
			break;
		}
	}
	var y = path.node().getPointAtLength(x).y;
	var coord = {"x" : x, "y" : pos.y};
	return coord;
}

function loadTweets()  {
	var svg = d3.select(".current").select(".graphs");
	var date = new Date(svg.select("g").select("path").data()[0][0].x * 1000);

	var dateString = date.getFullYear()+"-"+("0" + (date.getMonth()+1)).slice(-2) +"-"+("0" + date.getDate()).slice(-2);
	var url = document.URL + "/../tweets/"+ dateString + ".json";
	$.ajax({
		dataType: "json",
		url: url,
		type: 'get',
		success: function(tweets, status){readTweets(tweets, status);},
		error: function(xhr,desc,err){console.log(xhr); console.log('Details: ' + desc + '\nError: ' + err);}
	});
}

function readTweets(tweets, status) {
	var currentRow = d3.select(".current");
	var svg = currentRow.append("div").attr("class", "twitter").append("svg");
	var path = currentRow.select("g").select("path");
	var maxHeight = rowHeight * (factor-1);
	var maxWidth = 200;
	jQuery.each(tweets, function(i, tweet) {
		var coord = getCoordinates(path, tweet['time']);
		var g = svg.append('g').attr("class", "twitterGroup").attr("transform", function(d) {return "translate("+coord.x+",0)"});
		var circle = g.append("circle").attr("cy", function() { return -(maxHeight-coord.y); }).attr("cx", 0).attr('r', 5).style("fill", "red");
		var line = g.append("line").attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', function() { return -(maxHeight-coord.y); }).style("stroke", "red");
		var textRect = g.append('g').data([tweet]);
		textRect.attr("class", "textRect").attr("transform", function(d) {return "translate(" + -(maxWidth/2) + ",0)"});
		var image = textRect.append("image").attr("id", "bird").attr("transform", function(d) {return "translate(-10,10)"});
		image.attr("xlink:href", "small-twitter-bird-icon.png").attr("width",10).attr("height", 10);
		var rect = textRect.append("rect");
		var text = textRect.append("text").text(function() {return tweet['tweet']; }).attr("width",maxWidth).attr("height", 30);;
		var w = wrap(text, maxWidth);
		if (w < maxWidth) {
			var trans = (maxWidth-w)/2 - maxWidth/2;
			text.attr("width",w);
			textRect.attr("transform", function(d) {return "translate("+trans+",0)"});
		}

		rect.attr("class", "tweet").attr("width",w).attr("height", 30).attr('ry', '6').attr('rx', '6');
		textRect.on("mouseenter", function() {
			var grect = d3.select(this);
			var r = grect.select("rect");
			text.text(function() {return tweet['tweet']; }).attr("width",maxWidth).attr("height", 30);;
			var w = wrap(text, maxWidth*2);
			currentRow.select(".instagram").select("svg").style("z-index", "0");
			currentRow.select(".twitter").select("svg").style("z-index", "1");
			grect.transition().duration(500).attr("transform", function(d) {return "translate(" + -(w)/2 + ",-50)"});
			r.transition().duration(500).attr("width",w).attr("height", 100);

		});
		textRect.on("mouseleave", function() {
			text.text(function() {return tweet['tweet']; }).attr("width",maxWidth).attr("height", 30);;
			var w = wrap(text, maxWidth);
			var grect = d3.select(this);
			grect.select("rect").transition().duration(500).attr("width",w).attr("height", 30);
			grect.transition().duration(500).attr("transform", function(d) {return "translate(" + -(w/2) + ",0)"});

		});
		}); 

}


function wrap(text, width) {
var length;
var endline = false;
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        y = text.attr("y"),
        dy = 1.5,
        tspan = text.text(null).append("tspan").attr("x", 2).attr("y", y).attr("dy", dy + "em");
    while ((word = words.pop()) && !endline) {
      line.push(word);
      tspan.text(line.join(" "));
      length = tspan.node().getComputedTextLength();
      if ((length + 3) > width) {
      	line.push("...")
      	tspan.text(line.join(" "));
        endline = true;
      }
    }
  length = tspan.node().getComputedTextLength();
  });
  return length;
}


/*function generateVerticalBackgroundGradient(centerx) {
	var centerstring = centerx/width*100 + "%";
	var stops = Array(); stops["0%"] = "#000022"; stops[centerstring] = "#07cbf2"; stops["100%"] = "#000022";
	var gradients =  Array();
	gradients["firefox"] = "-moz-linear-gradient(left, ";
	gradients["chrome"] = "-webkit-gradient(linear, left top, right top, "
	gradients["chrome10"] = "-webkit-linear-gradient(left, "
	gradients["opera"] = "-o-linear-gradient(left, "
	gradients["ie10"] = "-ms-linear-gradient(left, "
	gradients["w3c"] = "linear-gradient(to right, "
	//gradients["ie"] = "progid:DXImageTransform.Microsoft.gradient(GradientType=1, "
	for (var key in stops) {
		gradients["firefox"] += stops[key] + " " + key + ", ";
		gradients["chrome"] += "color-stop("+ key + "," + stops[key] + "), ";
		gradients["chrome10"] += stops[key] + " " + key + ", "
		gradients["opera"] += stops[key] + " " + key + ", ";
		gradients["ie10"] += stops[key] + " " + key + ", ";
		gradients["w3c"] += stops[key] + " " + key + ", ";
	}
	for (var key in gradients) {
		gradients[key] = gradients[key].slice(0, -2);
		gradients[key] += ")";
	}

	var body = d3.select('body');
	for(var key in gradients) {
		var string = gradients[key];
		body.style("background", function() {return string}).transition().duration(500);
	}
}
*/

function generateVerticalBackgroundGradient(xcenter) {	
	var centerstring = xcenter/width*100 + "%";
	var stops = Array(); stops["0%"] = "#0e1177"; stops[centerstring] = "#55aaff"; stops["100%"] = "#0e1177";
	var svg = d3.select("#background").select("svg");
    var gradient = svg.append("svg:defs")
      .append("svg:linearGradient")
        .attr("id", "backgroundGr")
        .attr("x1", "0%") //gradient direction :)
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%")
        .attr("spreadMethod", "pad");
    for (var key in stops) {
        var stop = gradient.append("svg:stop")
        .attr("offset", key)
        .attr("stop-color", stops[key])
        .attr("stop-opacity", 1);
        if(key === centerstring) {
        	stop.attr('class', 'center');
        }
    }
    svg.append("rect").attr("height", height).attr("width", width).style("fill", 'url("#backgroundGr")').transition().duration(500);
}

function moveBackgroundGradient(xcenter) {
	var centerstring = xcenter/width*100 + "%";
	var gradient = d3.select("#background").select("svg").select('defs');
	gradient.select('.center').transition().duration(500).attr("offset", centerstring);
}