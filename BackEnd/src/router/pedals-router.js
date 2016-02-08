/**
 * Created by Quentin on 1/14/2016.
 */

var app = require('../../app/core/core.js').app,
    router = require('../../app/core/core.js').express.Router({mergeParams: true}),
    userController = require('../domain/controllers/user-controller'),
    pedalGateway = require('../data/pedal-gateway'),
    pedalFinder = require('../data/pedal-finder'),
    pedalController = require('../domain/controllers/pedals-controller'),
    pedal = require("../domain/Pedal");


router.get("/all", function(req, res) {
    console.log("In the getAll");
    if(!(req.params.user_id && typeof req.params.user_id === 'undefined')) {
        userController.pedalRetriever(req.params.user_id, function(response) {
            res.send(response);
        });
    } else {
        res.sendStatus(404);
    }
});

router.post("/create", function(req, res) {
    console.log("In create route");
    console.log(req.body);
    pedal.JsonToPedal(req.body, function(err, result) {
        if(err) {
            res.sendStatus(400);
        } else {
            pedalGateway.savePedal(req.body, function(response, message) {
                if(response) {
                    userController.updateUserPedals(req.params.user_id, message.ops, function() {

                    });
                    res.send(message.ops[0]);
                } else {
                    console.log(message);
                    res.sendStatus(500);
                }
            });
        }
    });
});

router.post("/caca", function(req, res) {
    res.sendStatus(200);
})



router.get("/:pedalId", function(req, res) {
    pedalFinder.myfindOne(req.params.pedalId, function(err, result) {
        if(err) {
            res.sendStatus(404);
        } else {
            res.send(result[0]);
        }
    });
});

router.put("/:pedalId", function(req, res) {
    var myPedal = req.body;
    pedal.JsonToPedal(myPedal, function(err, response) {
        if(err) {
            res.sendStatus(400);
        } else {
            console.log("Body : ");
            console.log(req.body);
            pedalGateway.updatePedal(req.body, function(error, message) {
                if(error) {
                    res.sendStatus(404)
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});

/**
 *
 * {
 *      "_note": 0...5
 *
 * }
 *
 *
 */
router.post("/:pedalId/rate", function(req, res){
    console.log("-------------------------------------------------------------------------------------------------")
    console.log(req.body._rate);

    console.log("-------------------------------------------------------------------------------------------------")

    if(req.body._rate && req.params.pedalId) {
        pedalController.updatePedalNote(req.params.pedalId, req.body._rate, function(err, result) {
            if(err) {
                res.sendStatus(400);
            } else {
                res.sendStatus(200);
            }
        });
    }
});






router.post("/:pedalId/comments", function(req, res) {
    if(req.body._comments && req.params.pedalId) {
        pedalController.updatePedalComment(req.params.pedalId, req.body._comments, function(err, result) {
            if(err) {
                res.sendStatus(400);
            } else {
                res.sendStatus(200);
            }
        });
    }
});

module.exports = router;