/**
 * This module is used to find the information about the log in the collection "logs".
 *
 * Created by Quentin on 1/25/2016.
 */

var ObjectID = require('mongodb').ObjectID;
var core = require('../../app/core/core');

/**
 * This function allow you to find one log with the given logsId.
 *
 * @param       {uuid}          This logsId is the uuid of the log in mongodb.
 * @param       {function}      This callback function take two parameter, the first one is the error message, null
 *                              if there is no error, and the second one is the result, null if there is an error.
 */
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
}


exports.myFindOne = myfindOne;