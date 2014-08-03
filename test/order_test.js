process.env.NODE_ENV = "development";

var request = require("supertest");
var app = require("../app");
var db = require("../models");
var should = require("should");

describe("Order", function () {
    describe("Get orders", function () {
        it("get", function (done) {
            request(app).get("/users/1/orders").expect(200).end(function (err, result) {
                if (err) {
                    return done(err);
                }
                done();
            });
        });
    });
});