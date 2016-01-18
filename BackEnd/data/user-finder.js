/**
 * Created by Quentin on 1/7/2016.
 */
var mongodb = require('mongodb');
var url = 'mongodb://localhost:27017/FXMachine';
var mongoClient = mongodb.MongoClient;
var ObjectID = require('mongodb').ObjectID;


/**
 * This function try to find the user in the database FXMachine and in the collection users. If the user is found
 * then the callback is called, with all the information about the user, otherwise an error is send.
 *
 * @param user      {json}      JSONObject with at least one information about the user
 * @param callback  {function}  Function that will be call when the result is found or not.
 */
function myfindOne(user, callback) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            callback(500);
        } else {
            var collection = db.collection('users');
            console.log(user.email);
            collection.find({email : user.email } ).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                    callback(500);
                } else if (result.length) {
                    console.log('Found:', result);
                    callback(result);
                } else {
                    console.log(result);
                    callback(404);
                    console.log('No document(s) found with defined "find" criteria!');
                }
            })
        }
    });
}

function findAllUser(id, callback) {
    mongoClient.connect(url, function(err, db) {
       if(err) {
           console.log("Error in findAll users")
           callback(500);
       } else {
           var collection = db.collection('users');
           checkRights(id, collection, function(isAdmin) {
               if(isAdmin) {
                   collection.find({ }).toArray(function(err, result) {
                       if(err) {
                           callback(500);
                       } else {
                           callback(result);
                       }
                   });
               } else {
                   callback(403);
               }
           });
       }
    });
}

// admin : 5693be97da0e725c1d0d431a
function checkRights(id, collection, callback) {
    var o_id = new ObjectID(id);
    collection.findOne({ _id : o_id} , function(err, result) {
        if(result.role == "admin") {
            callback(true);
        } else {
            callback(false);
        }
    });
}

function getUserPedal(id, callback) {
    mongoClient.connect(url, function(err, db) {
        if(err) {
            callback(500);
        } else {
            var o_id = new ObjectID(id);
            var collection = db.collection('users');
            collection.find({ _id : o_id} , function(err, result) {
                if(err) {
                    console.log(err);
                    callback(err);
                } else {
                    console.log(result.pedals);
                    if(typeof result.pedals === 'undefined') {
                        callback([]);
                    } else {
                        callback(result.pedals);
                    }
                }
            });
        }
    });
}


exports.getUserPedal = getUserPedal;

exports.findOne = myfindOne;

exports.findAllUser = findAllUser;