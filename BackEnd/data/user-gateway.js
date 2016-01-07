/**
 * Created by Quentin on 1/7/2016.
 */
var mongodb = require('mongodb');
var url = 'mongodb://localhost:27017/FXMachine';
var mongoClient = mongodb.MongoClient;


function createUser(user ,callback) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            callback(err);
        } else {
            console.log('Connection established to', url);
            var collection = db.collection('users');
            console.log(user);
            collection.insert([user], function (err, result) {
                if (err) {
                    callback(409);
                } else {
                    console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                    callback({ id :  result.ops[0]._id });
                    console.log(result.ops[0]._id );
                }
            });
        }
    });
}

exports.createUser = createUser;
