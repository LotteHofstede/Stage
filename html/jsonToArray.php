<?php

function getArray() {
	$filePath = "http://10.33.26.3/count/" . date('Y-m-d') . ".json";
	$jsondata = file_get_contents($filePath);
	$array = json_decode($jsondata, true);
	return array_values($array);
}
