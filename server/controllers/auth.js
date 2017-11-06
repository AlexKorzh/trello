const jwt = require('jwt-simple');
const User = require('../models/User');
const config = require('../config');

function tokenForUser (user) {
    const timeStamp = new Date().getTime();
    // sub - subject 
    // iat - issued at time 
    return jwt.encode({ sub:user.id, iat: timeStamp }, config.secret);
}
function signin (req, res, next) {
    //User has already head their email and password auth'd
    // We just need to give them a token
    res.send({token: tokenForUser(req.user)});
}

function signup (req, res, next) {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

     if (!email || !password) {
         return res.status(422).send({error: "You must provide email and password"}); 
     }
    // 1) See if a user with the given email exist
    User.findOne({email: email}, function (err, existingUser) {
        if (err) {
            return next(err);
        }
    // 2 If a user with email does not exit, return error
        if (existingUser) {
            return res.status(422).send({error: 'Email is in use'});
        }

    //3 If a user with email doesn no exist, create and save user record
        const user = new User({
            email: email,
            password: password
        });

    // Save the record in the database
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            
            res.json({token: tokenForUser(user)});
        });
    });
   
    //4 Respond to request indicating the user was created
    // res.send({success: "true"});
}
exports.signup = signup;
exports.signin = signin;