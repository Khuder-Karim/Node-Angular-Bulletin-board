/**
 * Created by Karim on 02.04.2016.
 */

var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;
var passwordHash = require('password-hash');
var async = require('async');

var Ad = require('./Ad');
var Comment = require('./Comment');

var HttpError = require('../error');

var UserSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: String,
    liked: [{
        type: Schema.Types.ObjectId,
        ref: 'Ad'
    }],
    created: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.virtual('password')
    .set(function(password) {
        this.hashedPassword = passwordHash.generate(password, {
            iteration: 10000
        });
    })
    .get(function() {
        return this.hashedPassword;
    })
;

UserSchema.methods.checkPassword = function(password) {
    return passwordHash.verify(password, this.hashedPassword);
};

UserSchema.statics.authorize = function(username, password, callback) {
    var User = this;

    async.waterfall([
        function(callback) {
            User.findOne({username: username}, callback);
        },
        function(user, callback) {
            if(user) {
                if(user.checkPassword(password))
                    callback(null, user);
                else
                    callback(new HttpError(403, "Password is not correct"));
            } else {
                callback(new HttpError(404, "User not found"));
            }
        }
    ], callback)
};

UserSchema.methods.setComment = function(adID, objComment, callback) {
    async.waterfall([
        function(callback) {
            Ad.findById(adID, callback);
        },
        function(ad, callback) {
            if(ad) {
                Comment.create(objComment, function(err, comment) {
                    if(err) return callback(err);
                    ad.comments.push(comment._id);
                    ad.save(function(err) {
                        if(err) return callback(err);
                        callback(null, comment);
                    });
                })
            } else {
                callback();
            }
        }
    ], callback);
};

module.exports = mongoose.model('User', UserSchema);

