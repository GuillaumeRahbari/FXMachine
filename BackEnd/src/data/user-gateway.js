/**
 * This module handle all the update of the collection "users".
 *
 * Created by Quentin on 1/7/2016.
 */
var mongodb = require('mongodb');
var core = require("../../app/core/core");

/**
 * This function is used to save the given used in the collection "users".
 *
 * @param       {json}          This json contains all the information about the user that will be add in the collection.
 * @param       {function}      This callback function will have two parameters, the first one is the error message, null
 *                              if there is no error, and the second one will be the result message, null if there is an
 *                              an error.
 */
function createUser(user ,callback) {
    core.getDb(function(db) {
        var collection = db.collection('users');
        user._role = "user";
        user._pedals = [];
        collection.insert([user], function (err, result) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                callback(null, {_id: result.ops[0]._id});
            }
        });
    });
}

/**
 * This function is used to delete the given user of the collection "users".
 *
 * @param       {json}          This json contains all the information needed about the user to delete, at least his id.
 * @param       {function}      This callback function will have two parameter, the first one is the error message, null
 *                              if there is no error, and the second one is the result message, null if there is an error.
 */
function deleteUser(user, callback) {
    core.getDb(function(db) {
        var collection = db.collection('users');
        collection.deleteOne([user], function(err, result) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    });
}

/**
 * This function will update the give user in the collection "users".
 *
 * @param       {json}          This json contains all the information about the user that will be update in the
 *                              collection.
 * @param       {function}      This callback function will have two parameters, the first one will be the error message,
 *                              null if there is no error and the second one will be the result message, null if there
 *                              is an error.
 */
function updateUser(user, callback) {
    core.getDb(function(db) {
        var collection = db.collection('users');
        collection.updateOne( {_id : user._id }  ,user, function(err, result) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    });
}

/**
 * Update the given user in the collection "users".
 * @type {updateUser}
 */
exports.updateUser = updateUser;

/**
 * Delete the given user in the collection "users".
 * @type {deleteUser}
 */
exports.deleteUser = deleteUser;

/**
 * Create the given user in the collectoin "users".
 * @type {createUser}
 */
exports.createUser = createUser;
