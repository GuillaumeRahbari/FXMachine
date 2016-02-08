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
       if(err) {
           callback(err, null);
       } else {
           var collection = db.collection('pedals');
            console.log(pedal._output);
           collection.updateOne(
               { "_id" : new mongodb.ObjectID(pedal._id) },
               { $set: { "_filters" : pedal._filters,
                         "_input": pedal._input,
                         "_output" : pedal._output}},
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

function updatePedalComments(pedalId, pedalComments, callback) {
    mongoClient.connect(url, function(err, db) {
        if(err) {
            callback(err, null);
        } else {
            console.log(pedalId);
            console.log(pedalComments);
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


function updatePedalNote(pedalId, pedalNote, ratecounter,callback) {
    mongoClient.connect(url, function(err, db) {
        if(err) {
            callback(err, null);
        } else {
            var collection = db.collection('pedals');
            collection.updateOne(
                { "_id" : new mongodb.ObjectID(pedalId) },
                { $set: { "_rate" : pedalNote}},
                function(error, res) {
                    if(error) {
                        callback(error, null);
                    } else {
                        collection.updateOne(
                            { "_id" : new mongodb.ObjectID(pedalId) },
                            { $set: { "_ratersCounter" : ratecounter}},
                            function(errorR, response) {
                                if(error) {
                                    callback(errorR, null);
                                } else {
                                    callback(null, response);
                                }
                            }
                        );
                    }
                }
            );
        }
    });
}

exports.updatePedalComments = updatePedalComments;
exports.updatePedalNote = updatePedalNote;
exports.deletePedal = deletePedal;
exports.savePedal = savePedal;
exports.updatePedal = updatePedal;