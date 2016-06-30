/**
 * Created by Karim on 31.03.2016.
 */

var express = require('express');
var AdRouter = express.Router();
var mongoose = require('../libs/mongoose');

var async = require('async');
var path = require('path');

var Ad = require('../models/Ad');
var Comment = require('../models/Comment');
var User = require('../models/User');

var multiparty = require('multiparty');

var checkAuth = require('../middleware/checkAuth');

AdRouter.route('/')
    .get(function(req, res, next) {
        if(req.query.find) {
            Ad.find({title: new RegExp(req.query.find, "i")}, function(err, ads) {
                if(err) return next(err);
                res.json(ads);
            })
        } else {
            Ad.find({}, function(err, ads) {
                if(err) return next(err);
                res.json(ads);
            })
        }
    })
    .post(function(req, res, next) {
        var form = new multiparty.Form();
        var author = req.user._id;

        form.parse(req, function(err, fields, files) {
            if(err) return next(err);
            var obj = {
                title: fields.title[0],
                description: fields.description[0],
                price: fields.price[0],
                author: author
            };

            Ad.uploadImg(files, function(img) {
                if(img)
                    obj.img = img;
                Ad.create(obj, function(err, ad) {
                    if(err) return next(err);
                    res.json(ad);
                });
            });
        });
    })
;


AdRouter.route('/:adId')
    .get(function(req,res,next){
        Ad.getAdDetails(req.params.adId, function(err, ad) {
            if(err) return next(err);
            res.json(ad);
        });
    })
    .put(checkAuth, function(req, res, next) {
        Ad.findById(req.params.adId, function(err, ad) {
            if(err) return next(err);
            if(ad) {
                async.waterfall([
                    function(callback) {
                        var form = new multiparty.Form();
                        form.parse(req, callback)
                    },
                    function(fields, files, callback) {
                        if(files.file) {
                            ad.deleteImg(function() {
                                Ad.uploadImg(files, function(imgUrl) {
                                    if(imgUrl)
                                        callback(null, fields, imgUrl);
                                    else
                                        callback(new Error(500, 'Error in ad new img'));
                                });
                            });
                        } else {
                            callback(null, fields);
                        }
                    }
                ], function(err, fields, imgUrl) {
                    if(err) return next(err);
                    ad.title = fields.title[0];
                    ad.description = fields.description[0];
                    ad.price = fields.price[0];
                    if(imgUrl)
                        ad.img = imgUrl;
                    ad.save(function(err) {
                        if(err) return next(err);
                        res.end();
                    });
                });
            } else {
                next(new Error(404));
            }
        });
    })
    .delete(checkAuth, function(req, res, next){
        Ad.findById(req.params.adId, function(err, ad) {
            if(err) return next(err);
            if(ad) {
                async.parallel([
                    function(callback) {
                        Comment.find({
                            '_id': {$in: ad.comments}
                        }, function(err, comments) {
                            if(err) callback(err);
                            async.each(comments, function(com, callback) {
                                com.remove(callback);
                            }, callback);
                        });
                    },
                    function(callback) {
                        ad.deleteImg(callback);
                    },
                    function(callback) {
                        User.find({liked: ad._id}, function(err, users) {
                            if(err) return callback(err);
                            async.each(users, function(user, callback) {
                                var index = user.liked.indexOf((ad._id));
                                user.liked.splice(index, 1);
                                user.save(callback);
                            }, callback);
                        });
                    }
                ], function(err) {
                    if(err) return next(err);
                    ad.remove(function(err) {
                        if(err) return next(err);
                        res.end();
                    });
                });
            } else {
                res.status(404).send({});
            }
        });
    })
;

AdRouter.route('/:adId/comment')
    .post(checkAuth, function(req, res, next) {
        var obj = req.body;
        obj.author = req.user._id;

        req.user.setComment(req.params.adId, obj, function(err, comment) {
            if(err) return next(err);
            res.json(comment);
        });
    })

;

AdRouter.route('/:adId/comment/:comId')
    .delete(checkAuth, function(req, res, next) {
        async.parallel([
            function(callback) {
                Comment.findByIdAndRemove(req.params.comId, callback);
            },
            function(callback) {
                Ad.findById(req.params.adId, function(err, ad) {
                    if(err) return next(err);
                    var index = ad.comments.indexOf(req.params.comId);
                    ad.comments.splice(index, 1);
                    ad.save(callback);
                })
            }
        ], function(err) {
            if(err) return next(err);
            res.json({});
        })

    })
;

AdRouter.route('/:adId/subscribe')
    .post(checkAuth, function(req, res, next) {
        Ad.findById(req.params.adId, function(err, ad) {
            if(err) return next(err);
            if(ad) {
                req.user.liked.push(ad._id);
                req.user.save(function(err) {
                    if(err) return next(err);
                    res.json(ad);
                });
            } else {
                res.end();
            }
        });
    })
;

AdRouter.route('/:adId/unsubscribe')
    .post(checkAuth, function(req, res, next) {
        Ad.findById(req.params.adId, function(err, ad) {
            if(err) return next(err);
            if(ad) {
                var index = req.user.liked.indexOf(ad._id);
                req.user.liked.splice(index, 1);
                req.user.save(function(err) {
                    if(err) return next(err);
                    res.json({id: ad._id});
                })
            } else {
                res.end();
            }
        });
    })
;

module.exports = AdRouter;
