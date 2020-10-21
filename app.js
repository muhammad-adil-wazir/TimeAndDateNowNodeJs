'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var https = require('https');
//var countries = require('public/javascripts/countries.json')

var routes = require('./routes/index');
//var contact = require('./routes/contact');
//var about = require('./routes/about');
//var namaztiming = require('./routes/namaztiming');
//var calender = require('./routes/calender');
//var hijricalender = require('./routes/hijricalender');
//var currencyconverter = require('./routes/currencyconverter');
//var tools = require('./routes/tools');
var users = require('./routes/users');
//var test = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);
//app.use('/contact', contact);
//app.use('/namaztiming', namaztiming);
//app.use('/calender', calender);
//app.use('/hijricalender', hijricalender);
//app.use('/about', about);
//app.use('/currencyconverter', currencyconverter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
//currency converter application bana la
