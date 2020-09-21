const mongoose=require("mongoose");

// const User = require('../models/User')

const UserSchema = new mongoose.Schema ({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

    type:{
        type:String,
        required:true
    }


});

const User = mongoose.model('User', UserSchema);
module.exports = User;