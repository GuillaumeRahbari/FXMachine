/**
 * Created by Quentin on 1/7/2016.
 */

var app = require('./app/core/core.js').app;
var router = require('./app/core/core.js').express.Router();
var mongodb = require('mongodb');
var userGateway = require('./data/user-gateway');
var userFinder = require('./data/user-finder');

/**
 * This method will sign in a client if his user name is already in the database. If not it will return 404.
 */
router.post('/signin', function (req, res) {
    userFinder.findOne(req.body, function(response) {
        res.send(response);
    });
});

/**
 * This method will only update the connection data base and log that the user is now offline
 */
router.post('/signout', function(req, res) {

});


router.get('/users', function(req, res) {
    userFinder.findAll(function(response) {
        res.send(response);
    })
});


/**
 * This method will communicate with the userGateway to add the user put in the body of the request to the database.
 * If the login of the user is free, then the user is added and an idea is returned, otherwise 409 is returned.
 */
router.put("/subscription", function (req, res) {
    userGateway.createUser(req.body, function(response) {
        res.send(response);
    });
});




module.exports = router;

