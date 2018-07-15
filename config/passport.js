

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//also we would be using mongoose model since we need to check the data that comes with the payload

const mongoose = require('mongoose'); //also User model needs to be here
const User = mongoose.model('users');

const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
//console.log(jwt_payload);
User.findById(jwt_payload.id)
.then(user => {

    //check
    if(user){
        return done(null, user);
    }
    //if not found
    return done(null, false);
})
.catch(err => console.log(err));

}));
};
