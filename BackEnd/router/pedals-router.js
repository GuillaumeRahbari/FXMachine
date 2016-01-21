/**
 * Created by Quentin on 1/14/2016.
 */

var app = require('../app/core/core.js').app,
    router = require('../app/core/core.js').express.Router({mergeParams: true}),
    userController = require('../domain/controllers/user-controller'),
    pedalGateway = require('../data/pedal-gateway'),
    pedalFinder = require('../data/pedal-finder');


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
    pedalGateway.savePedal(req.body, function(response, message) {
        if(response) {
            res.send(message);
        } else {
            res.sendStatus(400);
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


module.exports = router;