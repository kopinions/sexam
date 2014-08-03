process.env.NODE_ENV = "development";

var request = require("supertest");
var app = require("../app");
var db = require("../models");
var should = require("should");

describe("Order", function () {
    var sofia;
    var kaylaOrder;

    before(function (done) {

        prepareCleanDatabase(function(err, result) {
            if (err) {
                done("not clean success");
            }

            createUserAndOrder(done);
        });


        function prepareCleanDatabase(done) {
            db.User
                .destroy({})
                .success(function (affectRow) {
                    db.Order.destroy({}).success(function (affect) {
                        done();
                    }).fail(function (err) {
                        done(err);
                    });
                })
                .fail(function (err) {
                    done(err);
                });
        }
        function createUserAndOrder(done) {
            db.sequelize.sync({force: true}).success(function () {
                db.User.create({name: "sofia"}).success(function (user) {
                    sofia = user;
                    db.Order.create({receiver: "kayla", shippingAddress: "beijing"}).success(function (order) {
                        kaylaOrder = order;
                        user.setOrders([order]);
                        done();
                    }).fail(function (err) {
                        done(err);
                    });
                }).fail(function (err) {
                    done(err);
                });

            });
        }

    });


    describe("Get orders", function () {
        it("get", function (done) {
            var ordersUri = "/users/" + sofia.id + "/orders";
            request(app).get(ordersUri).expect(200).end(function (err, result) {
                if (err) {
                    return done(err);
                }

                result.body.length.should.eql(1);
                result.body[0].receiver.should.eql("kayla");
                result.body[0].shippingAddress.should.eql("beijing");
                result.body[0].uri.should.eql(ordersUri + "/" + kaylaOrder.id );
                done();
            });
        });

        it("return 404 when not find user", function (done) {
            request(app).get("/users/-1/orders").expect(404).end(function (err, result) {
                if (err) {
                    return done(err);
                }
                done();
            });
        });
    });

    describe("Get Order", function () {
        it("get by id", function (done) {
            request(app).get("/users/" + sofia.id + "/orders/" + kaylaOrder.id).expect(200).end(function (err, result) {
                if (err) {
                    return done(err);
                }
                done();
            });
        });


        it("return 404", function (done) {
            request(app).get("/users/" + sofia.id + "/orders/" + -1).expect(404).end(function (err, result) {
                if (err) {
                    return done(err);
                }
                done();
            });
        });
    });


    describe("Post", function () {
        it("create user order", function (done) {
            request(app)
                .post("/users/" + sofia.id + "/orders")
                .send({receiver: "samiu", shippingAddress: "beijing"})
                .expect(201)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    db.Order.find({where: {receiver: "samiu"}}).success(function (findedOrder) {
                        if (findedOrder === null) {
                            return done("not find order");
                        }
                        res.get('location').should.eql("/users/" + sofia.id + "/orders/" + findedOrder.id);
                        findedOrder.receiver.should.eql("samiu");
                        findedOrder.shippingAddress.should.eql("beijing");
                        done();
                    }).fail(function (err) {
                        return done(err);
                    });
                });
        });
    });
});