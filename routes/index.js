'use strict';
var express = require('express');
var router = express.Router();
//var countries = require('public/javascripts/countries.json');
const fs = require('fs');
//var sunCalc = require('suncalc');
var countries = [];
var zones = [];
fs.readFile('public/javascripts/countries.json', (err, data) => {
    if (err) throw err;
    countries = JSON.parse(data);
    zones = JSON.parse(data);
});
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', countries);
});
router.get('/contact', function (req, res) {
    res.render('contact');
});
router.get('/about', function (req, res) {
    res.render('about');
});

module.exports = router;
