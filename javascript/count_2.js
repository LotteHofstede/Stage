var interval = 10;
// dependancies
require('./moment.min.js');
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://137.58.106.9:27017', function(err, db) 
	{ 
		if (err) throw err;// authenticate
		var authDB = db.getMongo().getDB("admin");
		authDB.auth("reader", "mAy1ReAd0");

		// get date time
		var now		= moment().toDate();
		var past	= moment().minute( -interval ).toDate();
		console.log(past + " -> " + now);

		var db = db.getMongo().getDB("twitter");
		console.log( db.isGeo.count( {created_at:{ "$lt" : now, "$gte" : past }} ) );
	}
);


