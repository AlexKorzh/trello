const User = require('../models/User');
const List = require('../models/List');
const config = require('../config');

function create (req, res, next) {
    const title = req.body.title;
    const userId = req.user._id;
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


            // change the users location
    
            // user.boards[0].lists.push(list);
        
            // save the user
            user.save(function(err) {
            if (err) throw err;
                console.log('User successfully updated!');
            });
        
        });
    });

    res.send({message: 'New list successfully created'});

}

exports.create = create;
