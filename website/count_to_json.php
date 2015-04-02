<?php
	$time = isset($_GET["date"])?$_GET["date"]:time();
	$m = new MongoClient("mongodb://reader:mAy1ReAd0@134.58.106.9/admin");
	$db = $m->rate;
	$collection = $db->flow;
	$start = new MongoDate(strtotime(date("Y-m-d 00:00:00", $time)));
	$end = new MongoDate(strtotime(date("Y-m-d 23:59:59", $time)));

	$cursor = $collection->find(array("created_at" => array('$gte' => $start, '$lte' => $end)));
	$last = $collection->find()->limit(2)->sort(array('$natural' => -1));
	$string = '[';
	$counter = 0;
	foreach($cursor as $key => $value) {
		if($counter%15 == 0) {
			$string .= '{ "time" : "' . ($value["created_at"]->sec) . '", "count" : "' . $value["twitter"] . '", "instagram" : "' . $value["instagram"] . '"},';
		}
		$counter++;
	}
	$string = rtrim($string, ",");
	$string .= ']';
	
	$filename = date("Y-m-d", $time) . ".json";
	$jsonfile = fopen("/var/www/html/count/" . $filename,'w');

	fwrite($jsonfile, $string);
	fclose($jsonfile);
?>
