const List = require('../models/List');
const Board = require('../models/Board');
const mongoose = require('mongoose');

const config = require('../config');

function create (req, res, next) {
    const title = req.body.title;
    const boardId = req.body.boardId;

    const list = new List({
        title,
        board: boardId
    });

    list.save(function (error) {
        if (error) return next(error);

        Board.findByIdAndUpdate(
            boardId, 
            {$push: {lists: list}},
            {new: true, safe: true}, 
            callback
        );
    });

    function callback () {
        const response = list.getPublicFields();

        res.send({
            message: 'New list successfully created',
            list: response
        });
    }

}

function getLists (req, res) {
    const boardId = req.body.boardId;

    Board.findOne({_id: boardId})
    .populate('lists')
    .then((board) => {
        res.send({lists: board.lists});
        done();
    });
}

exports.create = create;
exports.getLists = getLists;
