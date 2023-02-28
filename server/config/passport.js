// Strategy fo jwt

import pkg from 'passport-jwt'
import User from '../models/User.js'
import * as dotenv from 'dotenv'
const JwtStrategy = pkg.Strategy
const ExtractJwt = pkg.ExtractJwt
dotenv.config()

let opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

export default (passport)=>{   
    passport.use(
        new JwtStrategy(opts, function(jwt_payload, done) {
        // User.findOne( {id :jwt_payload.sub}, function(err, user) {
        User.findById( jwt_payload.payload._id, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                // console.log("passport",user);
                return done(null, user);
            } else {
                // console.log("passport error");
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}
