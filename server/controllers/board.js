const Board = require('../models/Board');
const User = require('../models/User');
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

function getAllBoards (req, res, next) {
    console.log('req, res, next', req, res, next);
}

exports.create = create;
exports.getAllBoards = getAllBoards;