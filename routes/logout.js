/**
 * Created by Karim on 06.04.2016.
 */

var express = require('express');
var LogoutRouter = express.Router();

LogoutRouter.route('/')
    .post(function(req, res, next) {
        req.session.destroy();
        res.end();
    })
;

module.exports = LogoutRouter;
