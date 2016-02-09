/**
 * Created by Quentin on 1/18/2016.
 */

var mongodb = require('mongodb'),
    url = 'mongodb://localhost:27017/FXMachine',
    mongoClient = mongodb.MongoClient;
var core = require("../../app/core/core");


function saveLog(log, callback) {
    core.getDb(function(db) {
        var collection = db.collection('logs');
        collection.insert([log], function(err, result) {
            if(err) {
                console.log("Error during insertion of log in the collection")
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    });



    /*
    mongoClient.connect(url, function(err, db) {
       if(err) {
           console.log("Unable to connect to the db in saveLog");
           callback(err, null);
       } else {
           var collection = db.collection('logs');
           collection.insert([log], function(err, result) {
              if(err) {
                  console.log("Error during insertion of log in the collection")
                  callback(err, null);
              } else {
                  callback(null, result);
              }
           });
       }
    }); */
}

function deleteLog(log, callback) {
    core.getDb(function(db) {
        var collection = db.collection('logs');
        collection.deleteOne([log], function(err, result) {
            if(err) {
                console.log("Error during insertion of log in the collection")
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    });



    /*
    mongoClient.connect(url, function(err, db) {
       if(err) {
           console.log("")
           callback(err, null) ;
       } else {
           var collection = db.collection('logs');
           collection.deleteOne([log], function(err, result) {
              if(err) {
                console.log("Error during insertion of log in the collection")
                callback(err, null);
              } else {
                  callback(null, result);
              }
           });
       }
    }); */
}

exports.deleteLog = deleteLog;
exports.saveLog = saveLog;