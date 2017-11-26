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

boardSchema.pre('remove', function (callback) {
    this.model('List').remove({board: this._id}, (data) => {console.log(data)});
});

// boardSchema.pre('remove', function(next){
//     this.model('List').update(
//         {_id: {$in: this.lists}}, 
//         {$pull: {board: this._id}}, 
//         {multi: true},
//         next
//     );
// });

// boardSchema.pre('remove', function(next) {
//     // Remove all the assignment docs that reference the removed person.
//     this.model('Assignment').remove({ person: this._id }, next);
// });

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;