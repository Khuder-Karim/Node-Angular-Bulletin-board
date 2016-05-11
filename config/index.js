/**
 * Created by Karim on 29.03.2016.
 */

var nconf = require('nconf'),
    path = require('path');

nconf
    .argv()
    .env()
    .file({ file: path.join(__dirname, 'config.json')});

module.exports = nconf;
