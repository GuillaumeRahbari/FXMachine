/**
 * Created by Quentin on 1/7/2016.
 */
var mongodb = require('mongodb');
var url = 'mongodb://localhost:27017/FXMachine';
var mongoClient = mongodb.MongoClient;

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

exports.findOne = findOne;