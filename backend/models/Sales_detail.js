const { default: userEvent } = require('@testing-library/user-event');
const mongoose=require('mongoose');
const { Schema } =mongoose;

const Sales_detailSchema = new Schema({
    sal_id:{
        type:String,
        required:true
    },
    prod_id:{
        type:String,
        required:true
    },
    cat_id:{
        type:String,
        required:true
    },
    qnty:{
        type:Number,
        required:true
    },
    sal_price:{
        type:Number,
        required:true
    }
  });

  const Sales_detail = mongoose.model('sales_detail',Sales_detailSchema);
  module.exports = Sales_detail;