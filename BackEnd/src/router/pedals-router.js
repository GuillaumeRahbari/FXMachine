/**
 * Created by Quentin on 1/14/2016.
 */

var app = require('../../app/core/core.js').app,
    router = require('../../app/core/core.js').express.Router({mergeParams: true}),
    userController = require('../domain/controllers/user-controller'),
    pedalGateway = require('../data/pedal-gateway'),
    pedalFinder = require('../data/pedal-finder'),
    pedal = require("../domain/Pedal");


router.get("/all", function(req, res) {
    console.log(req.params.user_id);
    if(!(req.params.user_id && typeof req.params.user_id === 'undefined')) {
        userController.pedalRetriever(req.query.id, function(response) {
            res.send(response);
        });
    } else {
        res.sendStatus(404);
    }
});

router.put("/", function(req, res) {
    pedal.JsonToPedal(req.body, function(err, result) {
        if(err) {
            res.sendStatus(400);
        } else {
            pedalGateway.savePedal(req.body, function(response, message) {
                if(response) {
                    res.send(message);
                } else {
                    res.sendStatus(500);
                }
            });
        }
    });

});

router.get("/:pedalId", function(req, res) {
    pedalFinder.myfindOne(req.params.pedalId, function(err, result) {
        if(err == null) {
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    });
});

router.put("/:pedalId", function(req, res) {
    var myPedal = req.body;
    pedal.JsonToPedal(myPedal, function(err, response) {
        if(err) {
            res.sendStatus(400);
        } else {
            pedalGateway.updatePedal(req.body, function(response, message) {
                if(response) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(404);
                }
            });
        }
    });
});



module.exports = router;