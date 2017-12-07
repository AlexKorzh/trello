const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: String,
    cards: [{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }]
});

listSchema.methods.getPublicFields = function () {
    var fields = {
        title: this.title,
        _id: this._id
    };

    return fields;
};

listSchema.pre('remove', function (next) {
    const Card = mongoose.model('Card');

    Card.remove({ _id: { $in: this.cards } })
    .then(() => next());
});


const List = mongoose.model('List', listSchema);

module.exports = List;