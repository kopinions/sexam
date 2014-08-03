process.env.NODE_ENV = "test";

var request = require("supertest");
var app = require("../app");

describe("Product", function () {
    it("get", function (done) {
        request(app).get("/products").expect(200).end(function(err, result) {
            if(err) {
                return done(err);
            }
            done();
        });
    });
});