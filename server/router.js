// This is a controller functions
const Auth = require('./controllers/auth');
const Board = require('./controllers/board');
const List = require('./controllers/list');
const Card = require('./controllers/card');

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session:false});
const requireSignIn = passport.authenticate('local', {session: false});

var board = {
    get: function (request, response) {  
        require('./controllers/board').get;
    }
}

module.exports = function (app) {
    app.get('/', requireAuth, function (req, res) {
        res.send({ message: 'super secret code 123' });
    });
    // We have post request
    // requireSignIn - is a middleWare calls before Auth.sign controller function
    // User
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
    app.post('/createCard', requireAuth, Card.create);
    app.post('/updateCardTitle', requireAuth, Card.updateTitle);
    app.post('/getAllCards', requireAuth, Card.getAllCards);
    app.get('/cardDetails', requireAuth, Card.details)
}