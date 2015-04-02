<?php
function getTweets($time, $nr) {
	 ini_set("mongo.native_long", 1);
	$time = $time?$time:time();
	$nr = $nr?$nr:1;
	$m = new MongoClient("mongodb://reader:mAy1ReAd0@134.58.106.9/admin");
	$db = $m->twitter;
	$collection = $db->isGeo;
	$starttime = strtotime(date("Y-m-d 00:00:00", $time));
	$endtime = strtotime(date("Y-m-d 23:59:59", $time));
	$timeframe = floor(($endtime - $starttime)/$nr); 
	$halftime = floor($timeframe)/2; //halfway the timeframe

	$string = '[';
	while ($starttime < $endtime) {
		
		$queryTime = new MongoDate($starttime + $halftime);
		
		$object1 = $collection->find(array("created_at" => array('$gte' => $queryTime, '$ne' => null)))->sort(array("created_at" => 1))->limit(1);
		$object1->next();
		$t1 = $object1->current()['created_at']->sec;
		$object2 = $collection->find(array("created_at" => array('$lte' => $queryTime, '$ne' => null)))->sort(array("created_at" => -1))->limit(1);
		$object2->next();
		if ($object1 != null && $object2 != null){
			$t2 = $object2->current()['created_at']->sec;
			$t1 = $time - $t1; $t2 = $time - $t2;
			$object = ($t1 > $t2)?$object2:$object1;
			$string .= '{ "time" : "';
			$string .= $object->current()['created_at']->sec;
			$string .= '", "tweet" : "';
			$string .= $object->current()['text'];
			$string .= '", "username" : "';
			$string .= $object->current()['from_user'];
			$string .= '"},';
			$starttime = $starttime + $timeframe;
		}
	}
	
	$string = rtrim($string, ",");
	$string .= ']';
	$filename = date("Y-m-d", $time) . ".json";
	$jsonfile = fopen("/var/www/html/tweets/" . $filename,'w');
	fwrite($jsonfile, $string);
	fclose($jsonfile);
}


for ($i = 0; $i < 15; $i++) {
	getTweets(time()-86400*$i, 5);
}
?>
