const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    title: String,
    lists: [{
        type: Schema.Types.ObjectId,
        ref: 'List'
    }]
});

boardSchema.methods.getPublicFields = function () {
    var fields = {
        title: this.title,
        _id: this._id
    };

    return fields;
};

boardSchema.pre('remove', function (next) {
    const List = mongoose.model('List');
    
    List.remove({ _id: { $in: this.lists } })
        .then(() => next());
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;