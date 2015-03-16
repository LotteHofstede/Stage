
 function d3js() {   // Set up variables
    var el, parentWrap, otherWrap, 
        allTitles = d3.selectAll(".row").style(
            'cursor', 'pointer' // make it seem clickable
        );
  
    d3.select('#accordion').selectAll('.cell').on('click', function() {
        var el = this;
        if (!el.classList.contains("current")) {
            d3.selectAll(".row").
            transition().duration(500).style('height', function() {return (this === el.parentNode) ? "200px" : "50px"});

            d3.selectAll('.cell')
            .classed('current', function() {return (this === el) ? true : false})
            .transition().duration(500).style('width', function() {return (this === el) ? "200px" : "10px"});  //items in same column don't work properly???        
        }
        
    });
    
}