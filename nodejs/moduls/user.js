const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
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
    image:{
        type:String,
        required:false
    }
});

const User = mongoose.model('User',userSchema);

function checkUser(user){
    const schema = Joi.object({
        fname:Joi.string().min(3).max(50).required(),
        lname:Joi.string().min(3).max(50).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(3).max(10).required(),

    });
    return userSchema.validate(user);
}

exports.User= User;
exports.checkUser=checkUser;