const User = require('../models/User');
const List = require('../models/List');
const Board = require('../models/Board');
const mongoose = require('mongoose');
const config = require('../config');

function create (req, res, next) {
    const title = req.body.title;
    // boardId - gets ftom the request body
    const boardId = req.body.boardId;
    // userId - from database
    const userId = req.user._id;

    const list = new List({
        title,
        board: boardId
    });

    list.save(function (error) {
        if (error) return next(error);

        // Find board by id wich belongs to the user and push new list to lists
        Board.findById(boardId, function (err, board) {
            // doc is a Document
            board.lists.push(list);

            board.save(function(err) {
                if (err) throw err;
                    console.log('Board successfully updated!');
                });
        });
    });

    const response = list.getPublicFields();

    res.send({
        message: 'New list successfully created',
        list: response
    });
}

function getBoardLists (req, res) {
    const user = req.user;
    const boardId = req.body.boardId;

    List.find({board: boardId}, sendResponse).select('_id, title');

    function sendResponse (error, data) {
        res.send({lists: data});
    }
}

exports.create = create;
exports.getBoardLists = getBoardLists;
