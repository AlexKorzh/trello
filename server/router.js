const Auth = require('./controllers/auth');
const Board = require('./controllers/board');
const List = require('./controllers/list');
const Card = require('./controllers/card');

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session:false});
const requireSignIn = passport.authenticate('local', {session: false});

const createUploadFolder = require('./utils/createUploadFolder');

const mongoose = require('mongoose');

var board = {
    get: function (request, response) {  
        require('./controllers/board').get;
    }
}

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const board = req.body.board;
        const list = req.body.list;

        const folder = createUploadFolder(board, list);


        var id = mongoose.Types.ObjectId();

        console.log('========== ONE, UPLOAD FILE ========');

        cb(null, folder);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// const upload = multer({ dest: 'files/' }) // rename to Uploads

module.exports = function (app) {
    app.get('/', requireAuth, function (req, res) {
        res.send({ message: 'super secret code 123' });
    });

    app.post('/signin',requireSignIn, Auth.signin);
    app.post('/signup', Auth.signup);

    // Boards
    app.post('/createBoard', requireAuth, Board.create);
    app.post('/updateBoard', requireAuth, Board.update);
    app.get('/board', requireAuth, Board.get);
    app.get('/getBoardtitle', requireAuth, Board.getTitle);
    app.post('/deleteBoard', requireAuth, Board.deleteBoard);

    //Lists
    app.post('/createList', requireAuth, List.create);
    app.post('/updateList', requireAuth, List.update);
    app.post('/deleteList', requireAuth, List.deleteList);
    app.post('/getLists', requireAuth, List.getLists);

    //Cards
    app.post('/createCard', requireAuth, upload.single('file'), Card.create);
    app.post('/updateCardTitle', requireAuth, Card.updateTitle);
    app.post('/getAllCards', requireAuth, Card.getAllCards);
    app.get('/cardDetails', requireAuth, Card.details)
}