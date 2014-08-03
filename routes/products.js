var express = require('express');
var router = express.Router();
var db = require("../models");

router.get('/', function(req, res) {
    return res.send(200);
});

router.get('/:id', function (req, res) {
    console.log(req.params.id);
    db.Product.find(req.params.id).complete(function(err, result) {
        if(err || !result) {
            return res.send(404);
        }
        res.send(200);
    });

});

module.exports = router;
