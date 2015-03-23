<!DOCTYPE html>
	<head>
		<meta charset="UTF-8">
		<title>Lotte's Fisheye Accordion</title>
		<link href="accordion_rows.css" rel="stylesheet" type="text/css">
		<script type="text/javascript" src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
		<script>
			var array = new Array();
			<?php 	require_once("jsonToArray.php");
				$array = getArray();		
				foreach ($array as $key => $value) {
					echo 'array.push({"x" : ' . $value['time'] . ', "y" : ' . 						$value['count'] . "});";				
				} ?>

			var instaArray = new Array();
			<?php 	require_once("jsonToArray.php");
				$array = getArray();		
				foreach ($array as $key => $value) {
					echo 'instaArray.push({"x" : ' . $value['time'] . ', "y" : ' . 						$value['instagram'] . "});";				
				} ?>	</script>		
 
	</head>
	<body>
		<div id="container">
			<div id="accordion">
				<div class="row" id="cont">
					<svg id="svg" class="test">
						<g></g>
					</svg>
				</div>
				<div class="row">
					<svg id="test">
						<g></g>
					</svg>
				</div>
				<div class="row">
					<svg id="test2">
						<g></g>
					</svg>
				</div>
				<div class="row">
					<svg id="test3">
						<g></g>
					</svg>
				</div>
				<div class="row">
					<svg id="test4">
						<g></g>
					</svg>
				</div>
				<div class="row">
					<svg id="test5">
						<g></g>
					</svg>
				</div>
				<div class="row">
					<svg id="test6">
						<g></g>
					</svg>
				</div>

			</div>
		</div>
	</body>

		<script type="text/javascript" src="rows_fisheye.js"></script>
</html>
