const Card = require('../models/Card');
const mongoose = require('mongoose');

const config = require('../config');

function create (req, res, next) {
    const title = req.body.title;
    const listId = req.body.listId;

    const card = new Card({
        title,
        list: listId
    });

    card.save(function (error) {
        if (error) return next(error);

        send();
    });

    function send () {
        const response = card.getPublicFields();

        res.send({
            message: 'New card was successfully created',
            card: response
        });
    }
}

function getAllCards (req, res) {
    const listId = req.body.listId;

    Card.find({list: listId}, sendResponse).select('_id, title');

    function sendResponse (error, docs) {
        res.send({cards: docs});
    }
}

exports.create = create;
exports.getAllCards = getAllCards;
