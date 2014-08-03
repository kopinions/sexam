var express = require('express');
var router = express.Router();
var db = require("../models");

router.get('/', function (req, res) {
    res.send('respond with a resource');
});


router.get('/:user_id/orders', function (req, res) {
    db.User.find(req.params.user_id).complete(function (err, result) {
        if (err || !result) {
            return res.send(404);
        }
        res.send(200);
    });
});

router.get('/:user_id/orders/:order_id', function (req, res) {
    db.User.find(req.params.user_id).complete(function (err, result) {
        if (err || !result) {
            return res.send(404);
        }


        db.Order.find(req.params.order_id).complete(function (err, result) {
            if(err || result === null) {
                return res.send(404);
            }
            res.send(200);
        });
    });
});


router.post('/:user_id/orders', function (req, res) {
    db.User.find(req.params.user_id).complete(function (err, result) {
        if (err || !result) {
            return res.send(404);
        }
        res.send(201);
    });
});
module.exports = router;
