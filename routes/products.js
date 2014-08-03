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

router.post('/', function (req, res) {
    db.Product.create({name: req.params.name}).complete(function(err, result) {
        if (err) {
            return res.send(400);
        }

        res.location('/products/' + result.id);
        res.send(201);
    });

});

module.exports = router;
