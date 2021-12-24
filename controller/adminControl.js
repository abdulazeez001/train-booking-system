import trainData from "../models/trainModel"
import User from "../models/User"
import Admin from "../models/Admin"
import passport from "passport"
import jwt from "jsonwebtoken"
import config from "../config"

exports.newAdmin = function(req,res){
    const {name,email,username,contact,password,job_title} = req.body
    let newAdmin = new Admin({
        name,
        email,
        username,
        contact,
        password,
        job_title
    })

    Admin.addAdmin(newAdmin,(err,user)=>{
        if (err){
            let message = "";
            if(err.errors.username) message = "Username is already taken. ";
            if (err.errors.email) message += "Email already exists.";
            return res.json({
                success:false,
                message
            });
        }else {
            return res.json({
                success:true,
                message:"Admin registration is successful."
            })
        }
    })
}

exports.login = function(req,res){
    const {username,password} = req.body
    Admin.getAdminByUsername(username,(err,admin)=>{
        if (err) throw err;
        if(!admin) {
            return res.json({
                success:false,
                message:"Admin not found."
            })
        }

        Admin.comparePassword(password,admin.password,(err,isMatch)=>{
            const {_id,name,username,email,contact,job_title} = admin
            if(err) throw err;
            if(isMatch){
                const token  = jwt.sign({
                    type:"admin",
                    data:{
                        _id,
                        name,
                        username,
                        email,
                        contact,
                        job_title
                    }
                },config.secret,{
                    expiresIn:604800
                });
                return res.json({
                    success:true,
                    token:"JWT " + token
                })
            }else{
                return res.json({
                    success:true,
                    message:"Wrong Password"

                })
            }
        })
    })
}

exports.adminDashboard = function(req,res){
    return res.send(req.user)
}

exports.addTrain = function(req,res){
    const {trainName,
           origin,
           destination,
           travelDistance,
           arrival,
           departure,
           availableDays,
           trainNumber
           } = req.body
    let entry = new trainData({
        trainName,
        origin,
        destination,
        travelDistance,
        arrival,
        departure,
        availableDays,
        trainNumber,
        class:req.body.class,
        price:(req.body.price)*(req.body.travelDistance)
    })

    entry.save(function(err,saved){
        err ? res.send(`error occured here while saving data : ${err}`): res.send(`NEW TRAIN DETAILS ADDED SUCCESFULLY`)
    })
}

exports.getAllTrain = function(req,res){
    let query = trainData.find()
    query.sort({trainName:1})
    .limit(5)
    .exec(function(err,result){
        err ? res.send(err):res.send("TRAINS SCHEDULED :"+result)
    })
}

exports.getAllUsers = function(req,res){
    let query = User.find()
    query.sort({name:1})
    .limit(5)
    .exec(function(err,result){
        err ? res.send(err):res.send(result)
    })
}

exports.update = function(req,res){
    const {trainName,
           origin,
           destination,
           travelDistance,
           arrival,
           availableDays,
           departure
          } = req.body
    trainData.updateOne({trainName},{$set:{origin,
        destination,
        travelDistance,
        arrival,
        availableDays,
        departure}}).then(()=>{
            res.send(`${trainName} details updated`)
        }).catch(()=>{
            res.send("failed to update train details")
        })
}

exports.delete = function(req,res){
    const {trainName} = req.body
    trainData.deleteOne({trainName}).then(()=>{
        res.send(`${req.body.trainName} is cancelled `)
    })
}