var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    return res.send(200);
});

router.get('/:id', function (req, res) {
    return res.send(200);
});

module.exports = router;
