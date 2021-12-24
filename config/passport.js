import { ExtractJwt, Strategy } from "passport-jwt";
import User from "../models/User";
import Admin from "../models/Admin";
import config from ".";


module.exports = (userType, passport) =>{
    let opts = {
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:config.secret
    }
    passport.use(new Strategy(opts,(payload,done)=>{
        if (userType=='admin') {
            Admin.getAdminById(payload.data._id,(err,user)=>{
                if(err) return done(err)
                if (user) return done(null,user)
                return done(null,false);
            });
        }
        if (userType=='user') {
            User.getUserById(payload.data._id,(err,user)=>{
                if(err) return done(err)
                if (user) return done(null,user)
                return done(null,false);
            })
        }
    }))
}
