const Board = require('../models/Board');
const User = require('../models/User');
const mongoose = require('mongoose');
const config = require('../config');

function create (req, res, next) {
    const title = req.body.title;
    const id = req.user._id;

    const board = new Board({
        title,
        creator: id
    });

    console.log('user ----------->>', req.user._id);
    board.save(function (error) {
        if (error) return next(error);
            
        User.findById(id, function(err, user) {
            if (err) throw err;
        
            // add board 
            user.addBoard(board);
        
            // save the user
            user.save(function(err) {
            if (err) throw err;
                console.log('User successfully updated!');
            });
        
        });

        
    });

    res.send({message: 'New board successfully created'});
}

function getAllBoards (req, res) {
    const user = req.user;
    const boards = user.boards;
    let result = [];

    Board.find({
        '_id': {
            $in: boards.map(function (item) {
                return mongoose.Types.ObjectId(item);
            })
        }
    }, sendResponse).select('_id, title');

    function sendResponse (error, data) {
        res.send({boards: data});
    }
}

exports.create = create;
exports.getAllBoards = getAllBoards;