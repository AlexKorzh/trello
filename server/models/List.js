const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: String,
    board: {type: Schema.Types.ObjectId, ref: 'Board'},
});

const List = mongoose.model('List', listSchema);

module.exports = List;