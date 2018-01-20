const Card = require('../models/Card');
const List = require('../models/List');
const mongoose = require('mongoose');
const config = require('../config');
const getFullPath = require('../utils/getFullPath');
const sizeOf = require('image-size');
const path = require('path');
const mimetypes = require('../bin/mimetypes');
const Vibrant = require('node-vibrant');

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

        // const test = isImage && Vibrant.from(file.path).getPalette((err, palette) => {
        //     const a = palette;

        
        //     console.log('palette ->', palette.Vibrant.getHex());

        // });

    const imageSize = isImage && sizeOf(file.path);

    const fields = file ?
        {title, list, board, attachments: {
            name: fileName,
            mimetype: fileMimetype,
            url,
            preview: isImage && {
                width: imageSize.width,
                height: imageSize.height
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

function deleteCard (req, res, next) {
    const id = req.body.id;
    
    Card.findById({_id:id}, function(err, card) {
        card.remove(function (err) {
            res.send({card: id});
        });
    });
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

function addComment (req, res) {
    const id = req.body.id;
    const comment = {
        body: req.body.text,
        date: req.body.date
    }

    Card.findByIdAndUpdate(
        id, 
        {$push: {comments: comment}},
        {new: true, safe: true}, 
        callback
    );

    function callback (err, card) {
        if (err) return handleError(err);
        
        const response = card.getPublicFields();

        res.send({
            message: 'New comment successfully added',
            card: response
        });
    }
}

function updateComment (req, res) {
    const id = req.body.id;
    const commentId = req.body.commentId;
    const comment = {
        body: req.body.text,
        date: req.body.date
    }

    Card.findOneAndUpdate(      
        { "_id": id, "comments._id": commentId },
        { 
            "$set": {
                "comments.$.body": comment.body,
                "comments.$.date": comment.date
            }
        },
        {new: true, safe: true},
        callback
    );

    function callback (err, card) {
        if (err) return err;
        const response = card.getPublicFields();

        res.send({
            message: 'New comment successfully updated',
            card: response
        });
    }    
}

function deleteComment (req, res) {
    const id = req.body.id;
    const commentId = req.body.commentId;

    Card.findByIdAndUpdate(
        id, 
        {$pull: {comments: { _id: commentId } }},
        {new: true, safe: true, multi: true}, 
        callback
    );

    function callback (err, card) {
        if (err) return handleError(err);
        
        const response = card.getPublicFields();

        res.send({
            message: 'New comment successfully removed',
            card: response
        });
    }
}

exports.create = create;
exports.getAllCards = getAllCards;
exports.updateTitle = updateTitle;
exports.details = details;
exports.addComment = addComment;
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;
exports.deleteCard = deleteCard;