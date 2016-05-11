/**
 * Created by Karim on 04.04.2016.
 */

var HttpError = require('../error');

module.exports = function(req, res, next) {
    if(!req.session.user)
        return next(new HttpError(401, "You are not logged in"));
    next();
};
