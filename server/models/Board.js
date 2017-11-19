const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    title: String,
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
    lists: [{ type: Schema.Types.ObjectId, ref: 'List'}]
});

boardSchema.methods.getPublicFields = function () {
    var fields = {
        title: this.title,
        _id: this._id
    };

    return fields;
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;