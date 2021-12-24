import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import passport from "passport";
import chalk  from 'chalk';
import morgan from "morgan";
import config from "./config";
import checkUserType from './helpers/userType';
import admin from './routes/admin';
import user from './routes/users';

const app = express()
const {PORT,mongodb = {dsn,options}} = config

mongoose.connect(mongodb.dsn,mongodb.options)
        .then(()=>{
            console.log(chalk.bold.dim('Databse connected successfully ' + mongodb.dsn));
        })
        .catch((err)=>{
            console.log(err)
        })


app.use(cors());
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(passport.initialize());
app.use(passport.session());


// function routeHandler(){
//     return (req,res)=>{
//         res.send('hi')
//     }
// }

app.use(checkUserType);

app.use('/api/user', user);

app.use('/api/admin', admin);

// app.get('/', routeHandler());


app.use(async function(req,res,next){
    const error = new Error("Not Found")
    error.status = 404
    next(error)
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    })
})

app.listen(PORT, ()=>{
    console.log(chalk.bold.bgMagenta(`Server started on port ${PORT}`))
})