var logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb'),
    userRouter = require('./src/router/user-router'),
    pedalRouter = require('./src/router/pedals-router'),
    http = require('./app/core/core.js').getHttp(),
    app = require('./app/core/core.js').app;

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


app.use("/user", userRouter);
app.use("/user/:user_id/pedals", pedalRouter);

app.listen(3000);
console.log('Server listening on port 3000');
