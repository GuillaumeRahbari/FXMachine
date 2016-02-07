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
            var collection = db.collection('users');
            user._role = "user";
            user._pedals = [];
            console.log(user);
            collection.insert([user], function (err, result) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    console.log("test");
                    console.log(result.ops[0] );
                    console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                    callback(null, { _id :  result.ops[0]._id,
                                     _firstName : result.ops[0]._firstName,
                                     _lastName : result.ops[0]._lastName});
                }
            });
        }
    });
}

function deleteUser(user, callback) {
    mongoClient.connect(url, function(err, db) {
        if(err) {
            callback(err, null) ;
        } else {
            var collection = db.collection('users');
            collection.deleteOne([user], function(err, result) {
                if(err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        }
    });
}




/** work in progress **/
function updateUser(user, callback) {
    console.log("in user");
    console.log(user);
    mongoClient.connect(url, function(err, db) {
       if(err) {
           callback(err, null);
       } else {
           var collection = db.collection('users');
           collection.updateOne( {_id : user._id }  ,user, function(err, result) {
              if(err) {
                  callback(err, null);
              } else {
                  callback(null, result);
              }
           });
       }
    });
}

exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.createUser = createUser;
