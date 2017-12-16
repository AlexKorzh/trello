const Card = require('../models/Card');
const List = require('../models/List');
const mongoose = require('mongoose');

const config = require('../config');

function create (req, res, next) {
    const title = req.body.title,
          listId = req.body.listId,
          boardId = req.body.boardId;

    const card = new Card({
        title,
        list: listId,
        board: boardId
    });

    card.save(function (error) {
        if (error) return next(error);

        List.findByIdAndUpdate(
            listId, 
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
<<<<<<< HEAD
exports.updateTitle = updateTitle;
=======
exports.details = details;
>>>>>>> f7056d595bea0bc907eeba6062c980a78d4c8ced
