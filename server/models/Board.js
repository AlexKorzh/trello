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

boardSchema.pre('remove', function(next){
    this.model('List').update(
        {_id: {$in: this.lists}}, 
        {$pull: {board: this._id}}, 
        {multi: true},
        next
    );
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;