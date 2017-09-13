var MongoClient = require('mongodb').MongoClient;

// Connect
MongoClient.connect("mongodb://localhost:27018/atmdb", function(err, db) {
  if(!err) {
	console.log("We are connected");
  }
});