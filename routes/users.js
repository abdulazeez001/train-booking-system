import express from "express"
const router = express.Router();
import passport from "passport"
import jwt from "jsonwebtoken"
import User from "../models/User"
import config from "../config"



router.post('/register',(req,res)=>{
    const {name,email,username,password,contact} = req.body;
    let newUser = new User({
        name,
        email,
        username,
        password,
        contact
    })

    User.addUser(newUser,(err,user)=>{
        if (err) {
            let message = "";
            if (err.errors.username) message = "Username is already taken. ";
            if (err.errors.email) message += "Email already exists.";
            return res.json({
                success: false,
                message
            });
        } else {
            return res.json({
                success: true,
                message: "User registration is successful."
            });
        }
    })
})

router.post('/login',(req,res)=>{
    const {username,password} = req.body
    User.getUserByUsername(username,(err,user)=>{
        if(err){
            throw err
        }
        if(!user){
            return res.json({
                success:false,
                message:"User not found."
            })
        }

        User.comparePassword(password,user.password,(err,isMatch)=>{
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({
                    type: "user",
                    data: {
                        _id: user._id,
                        username: user.username,
                        name: user.name,
                        email: user.email,
                        contact: user.contact
                    }
                }, config.secret, {
                    expiresIn: 604800 // for 1 week time in milliseconds
                });
                return res.json({
                    success: true,
                    token: "JWT " + token
                });
            } else {
                return res.json({
                    success: true,
                    message: "Wrong Password."
                });
            }
        })
    })
})



router.get('/profile',passport.authenticate('jwt',{
    session:false
}),  (req, res) => {
    return res.send(
        req.user
    );
});




module.exports = router;