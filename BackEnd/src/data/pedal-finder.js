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
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    });
}

function init(callback) {
    mongoConnection.connect(function(err) {
        if (err) {
            logger.warn(err);
        }
        else {
            logger.info("mixes initialized");
        }
        callback(err);
    });
}


exports.myfindOne = myfindOne;
exports.init = init;