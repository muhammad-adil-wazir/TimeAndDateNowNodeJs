'use strict';

var express = require('express');
var router = express.Router();
const url = require('url');

//var countries = require('public/javascripts/countries.json');
//var currencyconverter = require('./currencyconverter.js');
//require('./tools.js')();
//var sunCalc = require('suncalc');

var tools = require('./tools.js');
const fs = require('fs');
var countries = [];
var zones = [];
var currencyCountries = [];
var firstCurrency, secondCurrency = {};
fs.readFile('public/javascripts/countries.json', (err, data) => {
    //console.log('drdr');
    if (err) throw err;
    countries = JSON.parse(data);
    zones = JSON.parse(data);
});

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', countries);
});
router.get('/calender', function (req, res) {
    res.render('calender');
});
router.get('/hijricalender', function (req, res) {
    res.render('hijricalender');
});
router.get('/namaztiming', function (req, res) {
    res.render('namaztiming');
});
router.get('/currencyconverter', function (req, res) {
    currencyCountries = tools.getAllCountries();
    res.render('currencyconverter', { currencyCountries: currencyCountries, firstCurrency: firstCurrency, secondCurrency: secondCurrency });
});
router.get('/convertCurrency', function (req, res) {
    const queryObject = url.parse(req.url, true).query;
    var _amount = queryObject.amount;
    var _fromCurrency = queryObject.fromCurrency;
    var _toCurrency = queryObject.toCurrency;
    tools.convertCurrency(_amount, _fromCurrency, _toCurrency).then(function (response) {
        res.json(response);
    });
    //res.render('currencyconverter');
});
router.get('/getCurrencyByID', function (req, res) {
    const queryObject = url.parse(req.url, true).query;
    var _currencyID = queryObject.currencyID;
    var _currency = tools.getCurrencyByID(_currencyID);
    res.json(_currency);
});
router.get('/contact', function (req, res) {
    res.render('contact');
});
router.get('/about', function (req, res) {
    res.render('about');
});

module.exports = router;
