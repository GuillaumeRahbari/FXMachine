/**
 * Created by Quentin on 1/25/2016.
 */

var mongodb = require('mongodb');
var url = 'mongodb://localhost:27017/FXMachine';
var mongoClient = mongodb.MongoClient;
var ObjectID = require('mongodb').ObjectID;
var core = require('../../app/core/core');


function myfindOne(logsId, callback) {
    core.getDb(function(db) {
        var collection = db.collection('logs');
        var o_id = new ObjectId(logsId);
        collection.findOne({ _id : o_id}, function(err, result) {
            if(err) {
                console.log(err);
                callback(err);
            } else {
                callback(result);
            }
        });
    });




    /*
    mongoClient.connect(url, function(err, db) {
        if(err) {
            console.log("Unable to connect to mongoDB", err);
        } else {
            var collection = db.collection('logs');
            var o_id = new ObjectId(logsId);
            collection.findOne({ _id : o_id}, function(err, result) {
                if(err) {
                    console.log(err);
                    callback(err);
                } else {
                    callback(result);
                }
            })
        }
    }); */
}


exports.myFindOne = myfindOne;