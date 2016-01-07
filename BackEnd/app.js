var logger = require('morgan');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var router = require('./fx-router');

var http = require('./app/core/core.js').getHttp();
var app = require('./app/core/core.js').app;

/**
 * Utilisation du logger en mode développement.
 */
app.use(logger('dev'));


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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
            db.collection('users').createIndex({"name":1}, {unique:true})
        }
    });
})();

app.use("/", router);

app.listen(3000);
console.log('Server listening on port 3000');
