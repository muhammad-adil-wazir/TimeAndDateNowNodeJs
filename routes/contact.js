'use strict';
var express = require('express');
var router = express.Router();
//var countries = require('public/javascripts/countries.json');

/* GET home page. */

router.get('/contact', function (req, res) {
    res.render('contact');
});

module.exports = router;
