/**
 * Created by Quentin on 1/14/2016.
 */
var mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;
var core = require("../../app/core/core.js");

/**
 * This function allow you to find one pedal in the collection "pedals".
 *
 * @param pedalId
 * @param callback
 */
function myfindOne(pedalId, callback) {
    core.getDb(function(db) {
        var collection = db.collection('pedals');
        var o_id =  new mongodb.ObjectId(pedalId);
        collection.find({_id: o_id }).toArray(function(error, result) {
            if(error) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    });
}

exports.myfindOne = myfindOne;