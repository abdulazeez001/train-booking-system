import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcrypt';
import uniqueValidator from "mongoose-unique-validator";


const AdminSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        required:[true,'Email is required'],
        index:true
    },
    username: {
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type:String,
        trim:true,
        required:[true,'Password is required']
    },
    contact: {
        type:String,
        required:true
    },
    job_title: {
        type:String,
        required:true
    },
})

AdminSchema.plugin(uniqueValidator);

const Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.getAdminById = function (id,cb){
    Admin.findById(id,cb)
}

module.exports.getAdminByUsername = function (username,cb){
    const query = {
        username
    }
    Admin.findOne(query,cb)
}

module.exports.addAdmin = function (newAdmin,cb){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newAdmin.password,salt, (err,hash)=>{
            if(err) throw err;
            newAdmin.password = hash;
            newAdmin.save(cb)
        })
    })
}

module.exports.comparePassword = function (password,hash, cb){
    bcrypt.compare(password,hash,(err,isMatch)=>{
        if (err) throw err;
        cb(null,isMatch)
    })
}