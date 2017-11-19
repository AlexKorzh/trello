const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: String,
    board: {type: Schema.Types.ObjectId, ref: 'Board'},
});

listSchema.methods.getPublicFields = function () {
    var fields = {
        title: this.title,
        id: this._id
    };

    return fields;
};

const List = mongoose.model('List', listSchema);

module.exports = List;