var logger = require('morgan');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');


var http = require('./app/core/core.js').getHttp();
var app = require('./app/core/core.js').app;

/**
 * Utilisation du logger en mode développement.
 */
app.use(logger('dev'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

/**
 * Permet de définir les autorisations pour les requêtes HTTP.
 */
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Définit qui a le droit d'appeler le serveur.
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS"); // Définit les méthodes qu'on a le droit d'utiliser.
    next();
});


(function initDB() {
    var mongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/FXMachine';

    mongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {

        }
    });
})();

/**
 * Permet de créer un serveur qui écoute sur le port 3000.
 * @type {http.Server}
 */
http.listen(3000, function () {
    console.log('Server listening on port 3000');

    app.get('/', function (req, res) {
        var mongoClient = mongodb.MongoClient;
        var url = 'mongodb://localhost:27017/FXMachine';
        var body = req.body;

        mongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                var collection = db.collection('users');
                collection.find(body).toArray(function (err, result) {
                    if (err) {
                        console.log(err);
                    } else if (result.length) {
                        console.log('Found:', result);
                        res.send(result);
                    } else {
                        console.log('No document(s) found with defined "find" criteria!');
                    }
                })
            }
        });
    });


    app.put("/subscription", function (req, res) {
        var mongoClient = mongodb.MongoClient;
        var url = 'mongodb://localhost:27017/FXMachine';

        var body = req.query;
        mongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
                res.send(err);
            } else {
                console.log('Connection established to', url);

                var collection = db.collection('users');
                collection.insert([body], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                        res.send({ id :  result.ops[0]._id });
                        console.log(result.ops[0]._id );
                    }
                });


            }
        });
    });
});