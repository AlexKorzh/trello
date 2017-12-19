const Board = require('../models/Board');
const User = require('../models/User');
const mongoose = require('mongoose');
const config = require('../config');

function create (req, res, next) {
    const userId = req.user._id;
    const title = req.body.title;
    const id = req.user._id;

    const board = new Board({
        title,
        creator: id
    });

    board.save(function (error) {
        if (error) return next(error);

        User.findByIdAndUpdate(
            userId, 
            {$push: {boards: board}},
            {new: true, safe: true}, 
            callback
        );
    });

    function callback () {
        const data = board.getPublicFields();

        res.send({message: 'New board successfully created', board: data});
    }
}

const get = (req, res) => {
    const { user } = req;
    const { id } = user;

    User.findOne({_id: id})
        .populate('boards')
        .then(sendResponse);

    function sendResponse (user) {
        res.send({boards: user.boards});
        done();
    }
};

function getTitle (req, res) {
    const boardId = req.query.boardId;

    Board.findOne({_id:boardId})
        .then(sendResponse);

    function sendResponse (board) {
        res.send({board: board});
        done();
    }
}

const update = (req, res) => {
    const boardId = req.body.boardId;
    const boardTitle = req.body.title;

    Board.findByIdAndUpdate(boardId, 
        { $set: { title: boardTitle }}, 
        { new: true }, 
        function (err, board) {
            if (err) return handleError(err);
            res.send({
                message: 'Board was successfully updated',
                board: board
            });
      });
};

function deleteBoard (req, res, next) {
    const boardId = req.body.boardId;
    
    Board.findById({_id:boardId}, function(err, board) {
        //... whatever you need to do prior to removal ...
        board.remove(function(err) {
            //content is removed, and the 'remove' pre/post events are emitted
            res.send({board: boardId});
        });
    });
}

exports.create = create;
exports.update = update;
exports.get = get;
exports.deleteBoard = deleteBoard;
exports.getTitle = getTitle;