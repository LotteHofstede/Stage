getArray($date) {
	$filePath = "count/" . date('Y-m-d',$date) . ".json";
	$jsondata = file_get_contents($filePath);
	$array = json_decode($jsondata, true);
	$array_out = new Array();
	foreach ($array as $key => $value) {
		$value[$twitter]
	}
}