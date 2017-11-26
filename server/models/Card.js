const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    title: String,
    list: {type: Schema.Types.ObjectId, ref: 'List'}
});

cardSchema.methods.getPublicFields = function () {
    var fields = {
        title: this.title,
        _id: this._id
    };

    return fields;
};

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;