<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");

	$amount = floor($_GET["amount"]);
	$files = array();
	for ($i = 0; $i < $amount; $i++) {
		$filePath = "http://10.33.26.3/count/" . date('Y-m-d', time() - $i*86400) . ".json";
		$files[] = json_decode(file_get_contents($filePath));
	}
	$result = json_encode($files);
	
	echo $result;
?>
