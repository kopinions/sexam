var express = require('express');
var router = express.Router();
var db = require("../models");

router.get('/', function(req, res) {
    db.Product.findAll().complete(function (err, results) {
        if (err) {
            return res.send(500);
        }
        return res.send(results);
    });

});

router.get('/:id', function (req, res) {
    db.Product.find(req.params.id).complete(function(err, result) {
        if(err || !result) {
            return res.send(404);
        }
        res.send(200);
    });

});

router.post('/', function (req, res) {
    db.Product.create({name: req.body.name, price: req.body.price}).complete(function(err, result) {
        console.log(err);
        if (err) {
            return res.send(400);
        }
        res.location('/products/' + result.id);
        res.send(201);
    });

});

module.exports = router;
