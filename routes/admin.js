import express from "express"
const router = express.Router();
import passport from "passport"
import train from "../controller/adminControl";



router.post('/register',(req,res)=>{
    return train.newAdmin(req,res)
})

router.post('/login',(req,res)=>{
    return train.login(req,res)
})

router.get('/profile',passport.authenticate('jwt',{
    session:false
}),(req,res)=>{
    return train.adminDashboard(req,res)
})

router.post('/add',passport.authenticate('jwt',{
    session:false
}),(req,res)=>{
   return train.addTrain(req,res)
})

router.get('/train',passport.authenticate('jwt',{
    session:false
}),(req,res)=>{
    return train.getAllTrain(req,res)
})

router.get('/users',passport.authenticate('jwt',{
    session:false
}),(req,res)=>{
    return train.getAllUsers(req,res)
})

router.put('/update',passport.authenticate('jwt',{
    session:false
}),(req,res)=>{
    return train.update(req,res)
})

router.delete('/cancel',passport.authenticate('jwt',{
    session:false
}),(req,res)=>{
    return train.delete(req,res)
})


module.exports = router