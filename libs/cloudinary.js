/**
 * Created by Karim on 06.05.2016.
 */
var cloudinary = require('cloudinary');
var config = require('../config');

cloudinary.config(config.get('cloudinary'));

module.exports = cloudinary;