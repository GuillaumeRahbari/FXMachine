/**
 * Created by Quentin on 1/14/2016.
 */

var app = require('../app/core/core.js').app,
    router = require('../app/core/core.js').express.Router({mergeParams: true}),
    userController = require('../controllers/user-controller');


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

module.exports = router;