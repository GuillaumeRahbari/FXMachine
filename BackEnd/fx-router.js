/**
 * Created by Quentin on 1/7/2016.
 */

var app = require('./app/core/core.js').app,
    router = require('./app/core/core.js').express.Router(),
    userGateway = require('./src/data/user-gateway'),
    userFinder = require('./src/data/user-finder'),
    userController = require('./src/domain/controllers/user-controller');


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


router.post('/users', function(req, res) {
    if (req.body.id == undefined) {
        userFinder.findAllUser(req.body.id, function (response) {
            res.send(response);
        });
    } else {
        res.send(400);
    }
});

router.get('/users/pedals', function(req, res) {
   if(req.query.id == undefined) {
       userController.pedalRetriever(req.query.id, function(response) {
            res.send(response);
       });
   } else {
       res.send(404);
   }
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

