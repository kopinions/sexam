var express = require('express');
var router = express.Router();
var db = require("../models");

router.get('/', function (req, res) {
    res.send('respond with a resource');
});

db.User.hasMany(db.Order);

router.get('/:user_id/orders', function (req, res) {
    db.sequelize.sync().done(function () {
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
    db.sequelize.sync().done(function () {
        db.User.find({where: {id: req.params.user_id}, include: [db.Order]}).complete(function (err, result) {
            if (err || !result) {
                return res.send(404);
            }

            var order = result.orders.filter(function (order) {
                return order.id.toString() === req.params.order_id;
            })[0];

            if (!order) {
                return res.send(404);
            }

            res.send(200, {
                uri: "/users/" + req.params.user_id + "/orders/" + order.id,
                receiver: order.receiver,
                shippingAddress: order.shippingAddress
            });
        });
    });
});


router.post('/:user_id/orders', function (req, res) {
    db.User.find(req.params.user_id).complete(function (err, user) {
        if (err || !user) {
            return res.send(404);
        }

        db.Order.hasMany(db.OrderItem);
        db.OrderItem.belongsTo(db.Order);

        db.Order.create({receiver: req.body.receiver, shippingAddress: req.body.shippingAddress}).success(function (order) {
            db.OrderItem.create({quantity: req.body.orderItems[0].quantity}).success(function (orderItem) {
                db.Product.find({where: {id: req.body.orderItems[0].productId}}).success(function (product) {
                    orderItem.setProduct(product).success(function() {
                        order.setOrderItems([orderItem]).success(function () {
                            user.setOrders([order]).success(function () {

                                res.location("/users/" + user.id + "/orders/" + order.id);
                                res.send(201);
                            });
                        });
                    });
                });
            });
        });
    });
});
module.exports = router;
