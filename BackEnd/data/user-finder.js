/**
 * Created by Quentin on 1/7/2016.
 */
var mongodb = require('mongodb');
var url = 'mongodb://localhost:27017/FXMachine';
var mongoClient = mongodb.MongoClient;

/**
 * This function try to find the user in the database FXMachine and in the collection users. If the user is found
 * then the callback is called, with all the information about the user, otherwise an error is send.
 *
 * @param user      {json}      JSONObject with at least one information about the user
 * @param callback  {function}  Function that will be call when the result is found or not.
 */
function findOne(user, callback) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            callback(500);
        } else {
            var collection = db.collection('users');
            console.log(user.name);
            collection.find({name : user.name } ).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                    callback(500);
                } else if (result.length) {
                    console.log('Found:', result);
                    callback(result);
                } else {
                    callback(404);
                    console.log('No document(s) found with defined "find" criteria!');
                }
            })
        }
    });
}

function findAll(callback) {
    mongoClient.connect(url, function(err, db) {
       if(err) {
           console.log("Error in findAll users")
           callback(500);
       } else {
           var collection = db.collection('users')
           collection.find({ }).toArray(function(err, result) {
                if(err) {
                    callback(500);
                } else {
                    callback(result);
                }
           });
       }
    });
}

exports.findOne = findOne;

exports.findAll = findAll;