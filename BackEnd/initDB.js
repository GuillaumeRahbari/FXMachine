/**
 * Created by Quentin on 1/11/2016.
 */

var mongodb = require('mongodb');


(function init() {
    var mongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/FXMachine';

    mongoClient.connect(url, function(err,db) {
        if(err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {

        }
    })
})();