/**
 * Created by Quentin on 1/14/2016.
 */


var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/FXMachine';


(function clear() {
    mongoClient.connect(url, function(err,db){
       db.dropDatabase();
    });
    console.log("ok");
})();
