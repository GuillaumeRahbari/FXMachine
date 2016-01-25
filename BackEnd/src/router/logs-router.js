/**
 * Created by Quentin on 1/18/2016.
 */

var app = require('../app/core/core.js').app,
    router = require('../app/core/core.js').express.Router();

router.get("/all", function(req, res) {
   res.send(200);
});