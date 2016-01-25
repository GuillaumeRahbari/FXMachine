/**
 * Created by Quentin on 1/14/2016.
 */

var mongodb = require('mongodb');
var url = 'mongodb://localhost:27017/FXMachine';
var mongoClient = mongodb.MongoClient;


function savePedal(pedal, callback) {
    mongoClient.connect(url, function(err, db){
       if(err) {
           console.log("Unable to save the pedal in the db", err);
           callback(500)
       } else {
           var collection = db.collection('pedal');
           collection.insert([pedal], function(err, result) {
              if(err) {
                  callback(false, err);
              } else {
                  callback(true, result);
              }
           });
       }
    });
}

function deletePedal(pedal, callback) {
    mongoClient.connect(url, function(err, db) {
        if(err) {
            callback(err, null) ;
        } else {
            var collection = db.collection('pedal');
            collection.deleteOne([pedal], function(err, result) {
                if(err) {
                    console.log("Error during insertion of log in the collection")
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        }
    });
}

exports.deletePedal = deletePedal;
exports.savePedal = savePedal;
