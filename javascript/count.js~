var conn = new Mongo("134.58.106.9");
var interval = 60;

// dependancies
load('/home/asro/Documents/javascript/moment.min.js');

// authenticate

var authDB = conn.getDB("admin");
authDB.auth('reader', 'mAy1ReAd0');

// get date time
var now		= moment().toDate();
var middle	= new Date(moment().second( -(interval/2) ).toDate());
var past	= moment().second( -interval ).toDate();

var db = conn.getDB("twitter");
var count = Number ( db.isGeo.count( {created_at:{ "$lt" : now, "$gte" : past }} ) );

var localConn = new Mongo();
var localDB = localConn.getDB("twitter");
var collection = localDB.getCollection("count");
collection.insert({date: middle, count: count});

