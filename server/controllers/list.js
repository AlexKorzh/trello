const User = require('../models/User');
const List = require('../models/List');
const Board = require('../models/Board');
const config = require('../config');

function create (req, res, next) {
    const title = req.body.title;
    const userId = req.user._id;
    const userBoards = user.boards;
    // boardId - gets ftom the request body
    // const boardId = req.body.boardId;

    const list = new List({
        title,
        // board: boardId
    });

    list.save(function (error) {
        if (error) return next(error);

        User.findById(userId, function(err, user) {
            if (err) throw err;

            // Find board by id wich belongs to the user and push new list to lists
            user.addList(boardId, list);
            
            // save the user
            user.save(function(err) {
            if (err) throw err;
                console.log('User successfully updated!');
            });
        
        });
    });

    const response = list.getPublicFields();

    res.send({
        message: 'New list successfully created',
        list: response
    });
    
}

exports.create = create;
