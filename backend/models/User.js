const { default: userEvent } = require('@testing-library/user-event');
const mongoose=require('mongoose');
const { Schema } =mongoose;

const UserSchema = new Schema({
    user_id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:false
    },
    address:{
        type:String,
        required:false
    },
    role:{
        type:String,
        required:true,
        default:'purchase'
    }    
  });

  const User = mongoose.model('users',UserSchema);
  module.exports = User;