const Card = require('../models/Card');
const List = require('../models/List');
const mongoose = require('mongoose');
const config = require('../config');

function create (req, res, next) {
    const title = req.body.title,
          list = req.body.list,
          board = req.body.board;

    const card = new Card({
        title,
        list,
        board
    });

    card.save(function (error) {
        if (error) return next(error);

        List.findByIdAndUpdate(
            list, 
            {$push: {cards: card}},
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

const updateTitle = (req, res) => {
    const cardId = req.body.cardId;
    const cardTitle = req.body.title;

    Card.findByIdAndUpdate(cardId, 
        { $set: { title: cardTitle }}, 
        { new: true }, 
        function (err, card) {
            if (err) return handleError(err);
            res.send({
                message: 'Card was successfully updated',
                card: card
            });
      });
};

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
    }
}

function details (req, res) {
    const id = req.query.id;

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
exports.updateTitle = updateTitle;
exports.details = details;
