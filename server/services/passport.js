const passport = require('passport');
const User = require('../models/User');
const config = require('../config');
const JwtStragety = require('passport-jwt').Strategy;
const ExtractJWt = require('passport-jwt').ExtractJwt;
const LocalStragety = require('passport-local');

//Creacte local stragety
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStragety(localOptions, function (email, password, done) {
    // Verify this email and password, call done with user
    // if it is the correct email and password
    // otherwise, call done with falls

    // to Find email in database we use USER MODEL
    // all searches operation return a callback
    User.findOne({email: email}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }

        //compare passwords - is 'password' equal to a user 'password'
        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false);
            }
            return done(null, user);
        });
    });

});

// SetUp options for JWT Stragety
const jwtOprions = {
    jwtFromRequest: ExtractJWt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT stragety
const jwtLogin = new JwtStragety(jwtOprions, function (payload, done) {
     // See if the user id in Payload exist in pur database

     // if it does, call 'done' with that other

     // otherwise, call done without a user object
     User.findById(payload.sub, function (err, user) {
         if (err) {
             return done(err, false);
         } 
         if (user) {
             done(null, user);
         } else {
             done(null, false);
         }
     });
}); 

// Tell passport to use this stragety
passport.use(jwtLogin);
passport.use(localLogin);