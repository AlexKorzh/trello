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

const update = (req, res) => {
    const listId = req.body.listId;
    const listTitle = req.body.title;

    List.findByIdAndUpdate(listId, 
        { $set: { title: listTitle }}, 
        { new: true }, 
        function (err, list) {
            if (err) return handleError(err);
            console.log('L I S T ----> ',list);
            res.send({
                message: 'List was successfully updated',
                list: list
            });
      });
};

function getLists (req, res) {
    const boardId = req.body.boardId;

    Board.findOne({_id: boardId})
    .populate('lists')
    .then((board) => {
        res.send({lists: board.lists});
        done();
    });
}

function deleteList (req, res, next) {
    const listId = req.body.listId;
    
    List.findById({_id:listId}, function(err, list) {
        list.remove(function(err) {
            res.send({list: listId});
        });
    });
}

exports.create = create;
exports.getLists = getLists;
exports.update = update;
exports.deleteList = deleteList;
