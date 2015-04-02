<!DOCTYPE html>
	<head>
		<meta charset="UTF-8">
		<title>Lotte's Fisheye Accordion</title>
		<link href="reset.css" rel="stylesheet" type="text/css">
		<link href="accordion_rows.css" rel="stylesheet" type="text/css">
		<script type="text/javascript" src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

		<script>
		var factor = 7;
		var rowHeight = 30;
		var bottomSpace = 30;
		var width = window.innerWidth;
		var height = window.innerHeight;
		var amount = ((height - bottomSpace) / rowHeight) - 6;
		var data= new Array();
		
		</script>		
 		<script type="text/javascript" src="rows_fisheye.js"></script>
	</head>
	<body onload="getData()">
	<div id="background"><svg></svg></div>
		<div id="container">
			<button onclick="switchScaling()">Switch</button>
			<div id="accordion">
				
			</div>
			<div class="xaxis"><svg></svg></div>
		</div>
		<div id="bottom"></div>
	</body>
		<script>document.getElementById('bottom').scrollIntoView()</script>
</html>
