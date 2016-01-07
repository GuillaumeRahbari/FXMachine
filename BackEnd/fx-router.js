/**
 * Created by Quentin on 1/7/2016.
 */

var app = require('./app/core/core.js').app;
var router = require('./app/core/core.js').express.Router();
var mongodb = require('mongodb');


router.post('/signin', function (req, res) {
    var mongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/FXMachine';
    var body = req.body;

    mongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            var collection = db.collection('users');
            console.log(body.name);
            collection.find({name : body.name } ).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    console.log('Found:', result);
                    res.send(result);
                } else {
                    res.send(404);
                    console.log('No document(s) found with defined "find" criteria!');
                }
            })
        }
    });
});


router.put("/subscription", function (req, res) {
    var mongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/FXMachine';

    var body = req.body;
    mongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            res.send(err);
        } else {
            console.log('Connection established to', url);
            var collection = db.collection('users');
            console.log(body);
            collection.insert([body], function (err, result) {
                if (err) {
                    res.send(409);
                } else {
                    console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                    res.send({ id :  result.ops[0]._id });
                    console.log(result.ops[0]._id );
                }
            });


        }
    });
});




module.exports = router;

