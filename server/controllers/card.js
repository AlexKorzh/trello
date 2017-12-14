const Card = require('../models/Card');
const List = require('../models/List');
const mongoose = require('mongoose');

const config = require('../config');

function create (req, res, next) {
    const title = req.body.title;
    const listId = req.body.listId;
    const boardId = req.body.boardId;

    const card = new Card({
        title,
        list: listId,
        board: boardId
    });

    card.save(function (error) {
        if (error) return next(error);

        List.findByIdAndUpdate(
            listId, 
            {$push: {lists: card}},
            {new: true, safe: true}, 
            callback
        );
    });

    function callback () {
        const response = card.getPublicFields();

        res.send({
            message: 'New card was successfully created',
            card: response
        });
    }
}

function getAllCards (req, res) {
    const lists = req.body.lists;

    // Find all cards belogns to one list, by listId 
    Card.find({list : {
        $in: lists.map(function(item){
             return mongoose.Types.ObjectId(item); 
        })
      }}, callback);

    function callback (error, docs) {
        res.send({cards: docs});
        console.log('R E S ------>', res.cards);
    }
}

function details (req, res) {
    const id = req.body.id;

    res.send(id);

    // // Find all cards belogns to one list, by listId 
    // Card.find({list : {
    //     $in: lists.map(function(item){
    //          return mongoose.Types.ObjectId(item); 
    //     })
    //   }}, callback);

    // function callback (error, docs) {
    //     res.send({cards: docs});
    //     console.log('R E S ------>', res.cards);
    // }
}

exports.create = create;
exports.getAllCards = getAllCards;
exports.details = details;
