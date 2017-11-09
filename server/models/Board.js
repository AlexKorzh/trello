const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    title: String,
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
});

const Board = mongoose.model('board', boardSchema);

module.exports = Board;