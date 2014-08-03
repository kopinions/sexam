var express = require('express');
var router = express.Router();
var db = require("../models");

router.get('/', function(req, res) {
    return res.send(200);
});

module.exports = router;
