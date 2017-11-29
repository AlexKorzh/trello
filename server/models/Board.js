const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    title: String,
    creator: {type: Schema.Types.ObjectId, ref: 'User'}
});

boardSchema.methods.getPublicFields = function () {
    var fields = {
        title: this.title,
        _id: this._id
    };

    return fields;
};

boardSchema.pre('remove', function(next) {
    this.model('List').remove({ board: this._id }, next);
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;