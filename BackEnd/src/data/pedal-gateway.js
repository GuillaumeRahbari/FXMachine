/**
 * Created by Quentin on 1/14/2016.
 *
 * This module handle all the creation, update or deletion of data in the collection pedal.
 */
var core = require("../../app/core/core");
var mongodb = require('mongodb');

/**
 * This function is used to save a new pedal in the database in the collection "pedals"
 *
 * @param       {json}              This json contains all the information about the pedal that will be insert in the
 *                                  database.
 * @param       {function}          This is the callback that will contain the information if the request succeed or not
 *                                  and the error message or the result
 */
function savePedal(pedal, callback) {
    core.getDb(function(db) {
        var collection = db.collection('pedals');
        collection.insert([pedal], function(err, result) {
            if(err) {
                callback(false, err);
            } else {
                callback(true, result);
            }
        });
    });
}

/**
 * This function is used to delete a pedal in the database in the collection "pedals".
 *
 * @param       {json}              This json contains all the information needed about the pedal that will be deleted.
 * @param       {function}          This callback function will contains two parameter the first one will be error
 *                                  message, null if there is no error and the result message, null if there is an error.
 */
function deletePedal(pedal, callback) {
    core.getDb(function(db) {
        var collection = db.collection('pedals');
        collection.deleteOne([pedal], function(err, result) {
            if(err) {
                console.log("Error during insertion of log in the collection")
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    });
}

/**
 * This function is used to update an pedal in the database in the collection named "pedals".
 *
 * @param       {json}          This json contains all the information about the pedal that will be update in the database.
 * @param       {function}      This callback function will contain two parameter, the fist one will be the error message,
 *                              null if there is no error and the response message, null if there is an error.
 */
function updatePedal(pedal, callback) {
    core.getDb(function(db) {
        var collection = db.collection('pedals');
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
    });
}

/**
 *  This function is here to update the list of comment of a pedal in the collection named "pedals".
 *
 * @param       {uuid}          The pedalId is the uuid of the pedal in mongodb.
 * @param       {array}         The pedalComments is an array of all the comments for the given pedalId.
 * @param       {function}      The callback function will contain two parameter, the first one will be the error message,
 *                              null if there is no error, and the second will be the result message, null if there is
 *                              an error.
 */
function updatePedalComments(pedalId, pedalComments, callback) {
    core.getDb(function(db) {
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
    });
}

/**
 * This function will update the note of the pedal with the given pedalId, with the given pedalNote and update the
 * number of rate with the given rateCounter.
 *
 * @param       {uuid}          The pedalId is the id of the pedal in the database.
 * @param       {int}           The pedalNote is the new note of the pedal.
 * @param       {int}           The rateCounter is the number of rate for the given pedal.
 * @param       {function}      The callback function will contain two parameter, the first one is the error message,
 *                              null if there is no error and the second one will be the result message, null if there
 *                              is an error.
 */
function updatePedalNote(pedalId, pedalNote, rateCounter ,callback) {
    core.getDb(function(db) {
        var collection = db.collection('pedals');
        collection.updateOne(
            { "_id" : new mongodb.ObjectID(pedalId) },
            { $set: { "_rate" : pedalNote,
                "_ratersCounter" : rateCounter}},
            function(error, res) {
                if(error) {
                    callback(error, null);
                } else {
                    callback(null, res);
                }
            }
        );
    });
}

/**
 * Update the list of comments of the pedal.
 * @type {updatePedalComments}
 */
exports.updatePedalComments = updatePedalComments;

/**
 * Update the note of the pedal.
 * @type {updatePedalNote}
 */
exports.updatePedalNote = updatePedalNote;

/**
 * Delete the given pedal.
 * @type {deletePedal}
 */
exports.deletePedal = deletePedal;

/**
 * Save the given pedal in the database
 * @type {savePedal}
 */
exports.savePedal = savePedal;

/**
 * Update the whole pedal in the database.
 * @type {updatePedal}
 */
exports.updatePedal = updatePedal;