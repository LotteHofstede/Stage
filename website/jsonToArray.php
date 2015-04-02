<?php

function getArray($date) {
	$filePath = "http://10.33.26.3/count/" . date('Y-m-d', $date) . ".json";
	$jsondata = file_get_contents($filePath);
	$array = json_decode($jsondata, true);
	return array_values($array);
}
