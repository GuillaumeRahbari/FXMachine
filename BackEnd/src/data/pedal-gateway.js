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
           var collection = db.collection('pedals');
           console.log(pedal);
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
            var collection = db.collection('pedals');
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

function updatePedal(pedal, callback) {
    mongoClient.connect(url, function(err, db) {
        console.log("derp")
       if(err) {
           console.log("herp")
           callback(err, null);
       } else {
           console.log("coucou")
           var collection = db.collection('pedals');
           console.log(pedal)
           collection.updateOne([pedal], function(error, result) {
               console.log("yooooo")
              if(err) {
                  console.log(":(")
                  callback(error, null);
              } else {
                  console.log(":)")
                  callback(null, result);
              }
           });
       }
    });
}

function updatePedalComments(pedalId, pedalComments, callback) {
    mongoClient.connect(url, function(err, db) {
        if(err) {
            callback(err, null);
        } else {
            var collection = db.collection('pedals');
            collection.updateOne(
                { "_id" : pedalId },
                { $set: { "_comments" : pedalComments}},
                function(error, res) {
                    if(error) {
                        callback(error, null);
                    } else {
                        callback(null, res);
                    }
                }
            );
        }
    });
}


function updatePedalNote(pedalId, pedalNote, callback) {
    mongoClient.connect(url, function(err, db) {
        if(err) {
            callback(err, null);
        } else {
            var collection = db.collection('pedals');
            collection.updateOne(
                { "_id": pedalId },
                { $set : { "_note": pedalNote }}
            , function(err, res) {
                if(err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    callback(null, res);
                }
            });
        }
    });
}

exports.updatePedalComments = updatePedalComments;
exports.updatePedalNote = updatePedalNote;
exports.deletePedal = deletePedal;
exports.savePedal = savePedal;
exports.updatePedal = updatePedal;