/**
 * Created by Karim on 29.03.2016.
 */

var mongoose = require('mongoose'),
    config = require('../config');

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

module.exports = mongoose;
