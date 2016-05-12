/**
 * Created by Karim on 31.03.2016.
 */

var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;

var cloudinary = require('../libs/cloudinary');

var AdSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    img: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    created: {
        type: Date,
        default: Date.now()
    },
    price: {
        type: Number,
        require: true
    }
    // Here add category
});

AdSchema.statics.getAdDetails = function(adID, callback) {
    var Ad = this;

    Ad.findById(adID)
        .populate('author', '-hashedPassword -created -liked')
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: 'username'
            }
        })
        .exec(function(err, ad) {
            if(err)
                callback(err);
            else
                callback(null, ad);
        });
};

AdSchema.methods.deleteImg = function(callback) {
    if(this.img) {
        var arr = this.img.split('/');
        var public_id = arr[arr.length - 1].split('.')[0];

        cloudinary.uploader.destroy(public_id, function(result) {
            console.log(result);
            callback();
        });
    } else {
        callback();
    }
};

AdSchema.statics.uploadImg = function(files, callback) {
    if(files.file) {
        cloudinary.uploader.upload(files.file[0].path, function(result) {
            if(result.url)
                callback(result.url);
            else
                callback();
        });
    } else {
        callback();
    }
};


module.exports = mongoose.model('Ad', AdSchema);


