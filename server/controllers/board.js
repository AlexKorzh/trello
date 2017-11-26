const Board = require('../models/Board');
const List = require('../models/List');
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

    board.save(function (error) {
        if (error) return next(error);

        User.update(
            { _id: id },
            { $push: { boards: board }},
            callback
        );

        function callback (err, doc) {
            if (err) throw err;
            console.log('B O A R D U S E R -------->' ,doc);
        }
    });

    const response = board.getPublicFields();

    res.send({message: 'New board successfully created', board: response});
}

function getAllBoards (req, res) {
    const user = req.user;
    const boards = user.boards;
    let result = [];

    console.log('B O A R D S --------------------->', user);

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

function deleteBoard (req, res, next) {
    const boardId = req.body.boardId;

    console.log('BOARD ID --------> ',boardId);

    Board.findOneAndRemove({_id: boardId}, (err, response) => {
        // note that if you have populated the Event documents to
        // the person documents, you have to extract the id from the
        // req.body.eventsAttended object 
        console.log('response --------> ',response);
        List.remove({_id: { $in: response.lists }}, (err, res) => {
            console.log('response --------> ',res);
        })
    })
}

exports.create = create;
exports.getAllBoards = getAllBoards;
exports.deleteBoard = deleteBoard;