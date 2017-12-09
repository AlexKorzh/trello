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
    app.post('/signin',requireSignIn, Auth.signin);
    app.post('/signup', Auth.signup);
    app.post('/createBoard', requireAuth, Board.create);
    app.post('/createCard', requireAuth, Card.create);

    // It will be change
    app.post('/boards/createList', requireAuth, List.create);
    app.post('/getBoardLists', requireAuth, List.getBoardLists);
    app.post('/getAllCards', requireAuth, Card.getAllCards);

    // DELETE
    app.post('/deleteBoard', requireAuth, Board.deleteBoard);

    app.get('/board', requireAuth, Board.get);
}