const Card = require('../models/Card');
const List = require('../models/List');
const mongoose = require('mongoose');
const config = require('../config');
const getFullPath = require('../utils/getFullPath');
const sizeOf = require('image-size');
const path = require('path');
const mimetypes = require('../bin/mimetypes');

function create (req, res, next) {
    const board = req.body.board;
    const title = req.body.title;
    const list = req.body.list;
    const file = req.file;

    const fileName = file && file.filename;
    const fileMimetype = file && file.mimetype;
    const fileDestination = file && file.destination;
    const fullPath = getFullPath(req);
    const url = (() => {
        return `${fullPath}${fileDestination}${fileName}`;
    })();

    const isImage = mimetypes.image.some(
        mimetype => mimetype === fileMimetype
    );

    const imageSize = isImage && sizeOf(file.path);

    const fields = file ?
        {title, list, board, attachments: {
            name: fileName,
            mimetype: fileMimetype,
            url,
            preview: {
                ...isImage && {
                    width: imageSize.width,
                    height: imageSize.height
                }
            }
        }} :
        {title, list, board};

    const card = new Card(fields);

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

    Card.findById(id, 
        function (err, card) {
            if (err) return handleError(err);
            res.send({
                card: card
            });
      });
}

exports.create = create;
exports.getAllCards = getAllCards;
exports.updateTitle = updateTitle;
exports.details = details;
