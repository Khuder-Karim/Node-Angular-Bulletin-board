var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var mongoose = require('./libs/mongoose');
var session = require('express-session');

var csrfProtaction = require('csurf')();

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.get("session:secret")));

var MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    saveUninitialized: false,
    resave: false
}));

app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public/css/sass'),
    dest: path.join(__dirname, 'public/css'),
    debug: true,
    indentedSyntax: true,
    outputStyle: 'compressed',
    prefix: '/css'
}));

app.use(require('middleware/loadUser'));

app.use(csrfProtaction);
app.use(function(req, res, next) {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
});

require('./routes')(app);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).json(err);
});

var port = process.env.PORT || config.get('port');

app.listen(port, function() {
    console.log("Listen port: ", port);
});

