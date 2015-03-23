mongodump -d twitter -c count -q '{date: {$gte: function() { var date = new Date(); date.setHour(0,0,0,0); return date; }, $lte: function() { var date = new Date(); date.setHour(23,59,59,0); return date; }}}' 



mongodump -d twittermongodump -d twittermongodump -d twitter
