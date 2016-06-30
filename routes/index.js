var express = require('express');
var Ad = require('../models/Ad');
var config = require('../config');

module.exports = function(app) {
    app.use('/user', require('./UserRouter'));
    app.use('/ad', require('./AdRouter'));
};

