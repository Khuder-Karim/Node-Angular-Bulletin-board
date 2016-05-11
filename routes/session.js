/**
 * Created by Karim on 01.05.2016.
 */

var express = require('express');
var SessionRouter = express.Router();

SessionRouter.route('/')
    .get(function(req, res, next) {
        if(req.user)
            res.json(req.user);
        else
            res.json({});
    })
;

module.exports = SessionRouter;