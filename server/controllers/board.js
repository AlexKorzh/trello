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
exports.get = get;
exports.deleteBoard = deleteBoard;