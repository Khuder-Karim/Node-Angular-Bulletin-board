/**
 * Created by Karim on 31.03.2016.
 */

var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    text: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        require: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Comment', CommentSchema);

