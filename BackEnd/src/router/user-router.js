    /**
 * Created by Quentin on 1/14/2016.
 */

var app = require('../../app/core/core.js').app,
    router = require('../../app/core/core.js').express.Router({mergeParams: true}),
    userGateway = require('../data/user-gateway'),
    userFinder = require('../data/user-finder'),
    userController = require('../domain/controllers/user-controller'),
    logsController = require('../domain/controllers/logs-controller');

/**
 * This method will sign in a client if his user name is already in the database. If not it will return 404.
 */
router.post('/signin', function (req, res) {
    userFinder.findOne(req.body, function(response) {
        res.send(response);
        logsController.connectionLog(response[0]._id, "in")
    });
});

/**
 * This method will only update the connection data base and log that the user is now offline
 */
router.post('/signout', function(req, res) {
    logsController.connectionLog(req.body._id, "out");
    res.send(200);
});


router.get("/all", function(req, res) {
    userController.retrieveAllUser(function(err ,result) {
        if(err) {
            res.sendStatus(400);
        } else {
            console.log("result in the router");
            console.log(result);
            res.sendStatus(JSON.stringify(result));
        }
    });
});




// TODO update le post en GET + changer l'URI
router.post('/users', function(req, res) {
    if (req.body.id == undefined) {
        userFinder.findAllUser(req.body.id, function (response) {
            res.send(response);
        });
    } else {
        res.send(400);
    }
});


/**
 * This method will communicate with the userGateway to add the user put in the body of the request to the database.
 * If the login of the user is free, then the user is added and an idea is returned, otherwise 409 is returned.
 */
router.put("/subscription", function (req, res) {
    // TODO : rajouter le model pour que le json soit :
    /**
     * {
    "_email":"coucou@test.fr",
    "_password": "dontTestME"
}
     et qu'on saved :


     { _email: 'coucou@test.fr',
      _password: 'dontTestME',
      _role: 'user',
      _pedals: [],
      _id: 56af6be39abd8adc195e2da2 }
     */
    userGateway.createUser(req.body, function(err ,response) {
        if(err) {
            res.send(400)
        } else {
            res.send(response);
        }
    });
});








module.exports = router;
