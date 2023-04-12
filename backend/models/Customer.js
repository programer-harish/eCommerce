const { default: userEvent } = require('@testing-library/user-event');
const mongoose=require('mongoose');
const { Schema } =mongoose;

const CustomerSchema = new Schema({
    cust_id:{
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
    }   
  });

  const Customer = mongoose.model('customer',CustomerSchema);
  module.exports = Customer;