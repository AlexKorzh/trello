const User = require('../models/User');
const List = require('../models/List');
const config = require('../config');

function create (req, res, next) {
    const title = req.body.title;
    const userId = req.user._id;
    const boardId = req.user.boards[0];

    console.log("title --------->" ,title);
    console.log("board id --------->" ,boardId);

    const list = new List({title});

    list.save(function (error) {
        if (error) return next(error);
        console.log("list saves");
    });

    res.send({message: 'New list successfully created'});

}

exports.create = create;
