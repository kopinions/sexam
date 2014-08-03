process.env.NODE_ENV = "development";

var request = require("supertest");
var app = require("../app");
var db = require("../models");
var should = require("should");

describe("Product", function () {
    var apple;
    before(function(done) {
        db.Product.create({name: "little apple"}).success(function(result) {
            apple = result;
            done();
        });
    });

    describe("Get products", function () {
        it("get", function (done) {
            request(app).get("/products").expect(200).end(function (err, result) {
                if (err) {
                    return done(err);
                }
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


    describe("Post", function() {
        it("create product", function (done) {
            request(app).post("/products").send({name: "bit apple"}).expect(201).end(function (err, res) {
                if (err) {
                    return done(err);
                }
                res.get('location').should.eql('/products/' + (apple.id +1));
                done();
            });
        });
    })
});