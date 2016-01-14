/**
 * Created by Quentin on 1/14/2016.
 */

var mongodb = require('mongodb');
var url = 'mongodb://localhost:27017/FXMachine';
var mongoClient = mongodb.MongoClient;
var ObjectID = require('mongodb').ObjectID;


function myfindOne(pedalId, callback) {
    mongoClient.connect(url, function(err, db) {
        if(err) {
            console.log("Unable to connect to mongoDB", err);
        } else {
            var collection = db.collection('pedals');
            var o_id = new ObjectId(pedalId);
            collection.findOne({ _id : o_id}, function(err, result) {
                if(err) {
                    console.log(err);
                    callback(err);
                } else {
                    callback(result);
                }
            })
        }
    });
}


exports.myfindOne = myfindOne;