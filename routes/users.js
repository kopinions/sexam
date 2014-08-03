var express = require('express');
var router = express.Router();
var db = require("../models");

router.get('/', function (req, res) {
    res.send('respond with a resource');
});

db.User.hasMany(db.Order);

router.get('/:user_id/orders', function (req, res) {
    db.sequelize.sync().done(function() {
        db.User.find({where: {id: req.params.user_id}, include: [db.Order]}).complete(function (err, result) {
            if (err || !result) {
                return res.send(404);
            }

            var stat = result.orders.map(function (order) {
                return {
                    uri: "/users/" + req.params.user_id + "/orders/" + order.id,
                    receiver: order.receiver,
                    shippingAddress: order.shippingAddress
                };
            });
            return res.send(200, stat);
        });
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
        db.Order.create({receiver: req.body.receiver, shippingAddress: req.body.shippingAddress}).complete(function (err, order) {
            if (err || !order) {
                return res.send(400);
            }
            res.location("/users/" + result.id + "/orders/" + order.id);
            res.send(201);
        });
    });
});
module.exports = router;
