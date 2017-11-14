const Auth = require('./controllers/auth');// This is a controller function
const Board = require('./controllers/board');// This is a controller function
const List = require('./controllers/list');// This is a controller function
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session:false});
const requireSignIn = passport.authenticate('local', {session: false});

module.exports = function (app) {
    app.get('/', requireAuth, function (req, res) {
        res.send({ message: 'super secret code 123' });
    });
    // We have post request
    // requireSignIn - is a middleWare calls before Auth.sign controller function
    app.post('/signin',requireSignIn, Auth.signin);
    app.post('/signup', Auth.signup);
    app.post('/createBoard', requireAuth, Board.create);

    // It will be change
    app.post('/boards', requireAuth, List.create);
    app.post('/getAllBoards', requireAuth, Board.getAllBoards);
}