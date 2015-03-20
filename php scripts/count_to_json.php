<?php
	$time = isset($_GET["date"])?$_GET["date"]:time();
	$m = new MongoClient();
	$db = $m->twitter;
	$collection = $db->count;
	$start = new MongoDate(strtotime(date("Y-m-d 00:00:00", $time)));
	$end = new MongoDate(strtotime(date("Y-m-d 23:59:59", $time)));
	$cursor = $collection->find(array("date" => array('$gte' => $start, '$lte' => $end)));
	foreach($cursor as $key => $value) {
		echo json_encode($value);
	}
?>
