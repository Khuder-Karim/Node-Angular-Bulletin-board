/**
 * Created by Karim on 31.03.2016.
 */

var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;

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


module.exports = mongoose.model('Ad', AdSchema);


