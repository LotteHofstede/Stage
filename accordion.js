$(function() {

    // Set up variables
    var $el, $parentWrap, $otherWrap, 
        $allTitles = $(".row").css({
            "cursor": "pointer" // make it seem clickable
        });
    
    
    // clicking on cell does stuff
    $("#accordion").delegate(".cell", "click", function() {
        
        // cache this, as always, is good form
        $el = $(this);
        
        // if this is already the active cell, don't do anything
        if (!$el.hasClass("current")) {
            $el.addClass("current");
            $otherCells = $(".cell").not($el);
            $otherRows = $(".row").not($el.parent());
            $otherCells.removeClass("current");

            $otherCells.children("#inner").remove();
            $otherRows.animate({
                height: 50
            });

            $otherCells.animate({
                width: 10
            });

            $el.animate({
                width: 200
            }, function() {initialize($(this));});

            $el.css("background", "#CADFAA");
            $otherCells.css("background", "#333");

            $el.parent().animate({
                height: 200
            });  
            
        }
        
    });
    
});
    //GOOGLE MAP
function initialize(element) {
    if (element.hasClass("current")) {
        $(window).ready(function() {load(element)});
        google.maps.event.addDomListener(window, 'load', initialize);
    }
}


function load(element) {
      var $inner = $('<div id="inner" style="width: 200px; height: 200px"></div>').appendTo(element);
      var myLatlng = new google.maps.LatLng(50.8833, 4.7);
      var mapOptions = {
        zoom: 14,
        center: myLatlng,
         disableDefaultUI: true,
                draggable: true,
                scrollwheel: false,
                disableDoubleClickZoom: true,
                zoomControl: true,
                panControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      var map = new google.maps.Map($inner[0], mapOptions);

      var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'You are here!'
      });

    
}