const { default: userEvent } = require('@testing-library/user-event');
const mongoose=require('mongoose');
const { Schema } =mongoose;

const Sales_masterSchema = new Schema({
    sal_id:{
        type:String,
        required:true,
        unique:true
    },
    cust_id:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
  });

  const Sales_master = mongoose.model('sales_master',Sales_masterSchema);
  module.exports = Sales_master;