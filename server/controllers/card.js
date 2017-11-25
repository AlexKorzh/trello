const Card = require('../models/Card');
const List = require('../models/List');
const mongoose = require('mongoose');
const config = require('../config');

function create (req, res, next) {
    // board title
    const title = req.body.title;
    // listId - gets ftom the request body
    const listId = req.body.listId;

    const card = new Card({
        title,
        list: listId
    });

    card.save(function (error) {
        if (error) return next(error);

        List.update(
            { _id: listId },
            { $push: { cards: card }},
            callback
        );

        function callback (err, doc) {
            if (err) throw err;
            console.log('C A R D  A DDE D -------------->' ,doc);
        }
    });

    const response = card.getPublicFields();


    res.send({
        message: 'New Card was successfully created',
        card: response
    });
}

function getAllCards (req, res) {
    const listId = req.body.listId;
    // Find all Cards by listID
    Card.find({list: listId}, sendResponse).select('_id, title');

    function sendResponse (error, docs) {
        res.send({cards: docs});
    }
}

exports.create = create;
exports.getAllCards = getAllCards;

