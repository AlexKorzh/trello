const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: String,
    board: {type: Schema.Types.ObjectId, ref: 'Board'}
});

listSchema.methods.getPublicFields = function () {
    var fields = {
        title: this.title,
        _id: this._id
    };

    return fields;
};

listSchema.pre('remove', function (next) {
    this.model('Card').remove({ list: this._id }, next);
});

const List = mongoose.model('List', listSchema);

module.exports = List;