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
    if(!(req.params.user_id && typeof req.params.user_id === 'undefined')) {
        userController.pedalRetriever(req.params.user_id, function(response) {
            console.log(response);
            res.send(response);
        });
    } else {
        res.sendStatus(404);
    }
});

router.put("/", function(req, res) {
    console.log(req.params.user_id);
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
                    res.sendStatus(500);
                }
            });
        }
    });

});

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


router.put("/:pedalId/note/", function(req, res){
    if(req.query.note && req.params.pedalId) {
        pedalController.updatePedalNote(req.params.pedalId, req.query.note, function(err, result) {

        });
    }
});


router.put("/:pedalId/comment", function(req, res){
    if(req.query.comment && req.params.pedalId) {
        pedalController.updatePedalComment( req.params.pedalId, req.query.comment, function(err, result){

        });
    }
});

module.exports = router;