
 function d3js(factorWidth, factorHeight) {   // Set up variables
 	var iniH = d3.select(".cell").style("height");
 	var iniW = d3.select(".cell").style("width");
 	var newH = factorHeight?(factorHeight * iniH.substring(0,iniH.length-2) + "px"):iniH;
 	var newW = factorWidth?(factorWidth * iniW.substring(0,iniW.length-2) + "px"):iniW;
 

    var el, parentWrap, otherWrap, 
        allTitles = d3.selectAll(".row").style(
            'cursor', 'pointer' // make it seem clickable
        );
  
    d3.select('#accordion').selectAll('.cell').on('click', function() {
        var el = this;
        if (!el.classList.contains("current")) {
            d3.selectAll(".row").
            transition().duration(500).style('height', function() {return (this === el.parentNode) ? newH : iniH});
           
            d3.selectAll('.cell').classed('current', function() {return (this === el) ? true : false})
            .transition().duration(500).style('width', function() {
            	return (this === el || (d3.select(this).style("width") == newW && d3.select(el).style("width") == newW)) ? newW : iniW;
            });
        	//if it's already 200px, we don't want to resize the other ones in the same column
        }
        
    });
    
}


