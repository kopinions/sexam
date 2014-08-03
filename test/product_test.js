process.env.NODE_ENV = "development";

var request = require("supertest");
var app = require("../app");
var db = require("../models");
var should = require("should");

describe("Product", function () {
    var apple;
    before(function(done) {
        db.Product.destroy({}, {truncate: true}).success(function (affectRow) {
            db.Product.create({name: "little apple", price: 2}).success(function(result) {
                apple = result;
                done();
            });
        }).fail(function (err) {
            done(err);
        });

    });

    after(function(done) {
        db.Product.destroy({}, {truncate: true}).success(function (affectRow) {
            done();
        }).fail(function (err) {
            done(err);
        });
    });

    describe("Get products", function () {
        it("get", function (done) {
            request(app).get("/products").expect(200).end(function (err, result) {
                if (err) {
                    return done(err);
                }



                result.body.length.should.eql(1);

                result.body[0].name.should.eql("little apple");
                result.body[0].uri.should.eql("/products/" + apple.id);
                result.body[0].price.should.eql(2);
                done();
            });
        });
    });


    describe("Get product", function () {
        it("get by id", function (done) {
            request(app).get("/products/" + apple.id).expect(200).end(function (err, result) {
                if (err) {
                    return done(err);
                }
                done();
            });
        });

        it("return 404", function (done) {
            request(app).get("/products/999").expect(404).end(function (err, result) {
                if (err) {
                    return done(err);
                }
                done();
            });
        });
    });


    describe("Post", function () {
        it("create product", function (done) {
            request(app).post("/products").send({name: "big apple", price: 1}).expect(201).end(function (err, res) {
                if (err) {
                    return done(err);
                }

                db.Product.find({where: {name: "big apple"}}).success(function (findProduct) {
                    res.get('location').should.eql('/products/' + findProduct.id);
                    findProduct.price.should.eql(1);
                }).fail(function (err) {
                    return done(err);
                });

                done();
            });
        });
    });
});