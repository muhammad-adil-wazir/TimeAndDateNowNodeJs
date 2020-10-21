//module.exports = function () {
//    this.sum = function (a, b) { return a + b };
//    this.multiply = function (a, b) { return a * b };
//    //etc
//}
var https = require('https');
var http = require('http');
const fss = require('fs');
const apiKey = '74956a2b653d3c6ba2b3';
//var currencyCountries = [];
module.exports = {
    convertCurrency: function (amount, fromCurrency, toCurrency, cb) {
        return new Promise((resolve, reject) => {
            fromCurrency = encodeURIComponent(fromCurrency);
            toCurrency = encodeURIComponent(toCurrency);
            var query = fromCurrency + '_' + toCurrency;

            var url = 'https://free.currconv.com/api/v7/convert?q='
                + query + '&compact=ultra&apiKey=' + apiKey;

            https.get(url, function (response) {
                //var body = '';

                //res.on('data', function (chunk) {
                //    body += chunk;
                //});

                //res.on('end', function () {
                //    try {
                //        var jsonObj = JSON.parse(body);

                //        var val = jsonObj[query];
                //        if (val) {
                //            var total = val * amount;
                //            return Math.round(total * 100) / 100;
                //            // cb(null, Math.round(total * 100) / 100);
                //        } else {
                //            var err = new Error("Value not found for " + query);
                //            console.log(err);
                //            cb(err);
                //        }
                //    } catch (e) {
                //        console.log("Parse error: ", e);
                //        cb(e);
                //    }
                //});

                let chunks_of_data = [];

                response.on('data', (fragments) => {
                    chunks_of_data.push(fragments);
                });

                response.on('end', () => {
                    let response_body = Buffer.concat(chunks_of_data);
                    var total = 0;
                    try {
                        var jsonObj = JSON.parse(response_body);

                        var val = jsonObj[query];
                        if (val) {
                           // total = Math.round((val * amount) * 100) / 100;
                           // return Math.round(total * 100) / 100;
                            // cb(null, Math.round(total * 100) / 100);
                        } else {
                            var err = new Error("Value not found for " + query);
                            console.log(err);
                            //cb(err);
                        }
                    } catch (e) {
                        console.log("Parse error: ", e);
                       // cb(e);
                    }
                    // promise resolved on success
                    resolve(val.toString());
                });

                response.on('error', (error) => {
                    // promise rejected on error
                    reject(error);
                });
            }).on('error', function (e) {
                console.log("Got an error: ", e);
                cb(e);
            });
        });
    },
    test: function () {
        return new Promise((resolve, reject) => {
            //var url = 'https://free.currconv.com/api/v7/countries?'
            //    + 'apiKey=' + apiKey;
            var url = 'public/javascripts/countryCurrencies.json';
            https.get(url, (response) => {
                let chunks_of_data = [];

                response.on('data', (fragments) => {
                    chunks_of_data.push(fragments);
                });

                response.on('end', () => {
                    let response_body = Buffer.concat(chunks_of_data);

                    // promise resolved on success
                    resolve(response_body.toString());
                });

                response.on('error', (error) => {
                    // promise rejected on error
                    reject(error);
                });
            });
        });
    },
    getAllCountries: function () {
        var currencyCountries = [];
        var _currencyNames = [];
        try {
            var jsonObj = JSON.parse(fss.readFileSync('public/javascripts/countryCurrencies.json', 'utf8'));
            var indexs = Object.keys(jsonObj);
            for (const index of indexs) {
                if (_currencyNames.indexOf(jsonObj[index].currencyName) == -1) {
                    currencyCountries.push(jsonObj[index]);
                    _currencyNames.push(jsonObj[index].currencyName);
                }
            }
        }
        catch (e) {
            console.log("Parse error: ", e);
        }
        return currencyCountries;
    },
    getCurrencyByID: function (currencyID) {
        var _currencyCountry = {};
        try {
            var _currencyCountries = this.getAllCountries();
            _currencyCountry = _currencyCountries.filter(cc => cc.currencyId == currencyID)[0];
            return _currencyCountry;
        }
        catch (e) {
            console.log("Parse error: ", e);
        }
        return _currencyCountry;
    }
}