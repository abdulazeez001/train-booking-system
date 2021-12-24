
import mongoose from "mongoose"
import bcrypt from "bcryptjs"

import uniqueValidator from "mongoose-unique-validator"


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
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
        type: String,
        unique: true,
        required: true
    },
    password: {
        type:String,
        trim:true,
        required:[true,'Password is required']
    },
    contact: {
        type: String,
        required: true
    }
});

UserSchema.plugin(uniqueValidator);

const User = module.exports = mongoose.model('User', UserSchema);


module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}


module.exports.getUserByUsername = function (username, callback) {
    const query = {
        username: username
    }
    User.findOne(query, callback);
}


module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}


module.exports.comparePassword = function (password, hash, callback) {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}