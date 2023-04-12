const { default: userEvent } = require('@testing-library/user-event');
const mongoose=require('mongoose');
const { Schema } =mongoose;

const Purchase_detailSchema = new Schema({
    pur_id:{
        type:String,
        required:true
    },
    prod_id:{
        type:String,
        required:true
    },
    qnty:{
        type:Number,
        required:true
    },
    pur_price:{
        type:Number,
        required:true
    },
    cat_id:{
        type:String,
        required:true
    }
  });

  const Purchase_detail = mongoose.model('purchase_detail',Purchase_detailSchema);
  module.exports = Purchase_detail;