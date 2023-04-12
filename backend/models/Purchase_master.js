const { default: userEvent } = require('@testing-library/user-event');
const mongoose=require('mongoose');
const { Schema } =mongoose;

const Purchase_masterSchema = new Schema({
    pur_id:{
        type:String,
        required:true,
        unique:true
    },
    user_id:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
  });

  const Purchase_master = mongoose.model('purchase_master',Purchase_masterSchema);
  module.exports = Purchase_master;