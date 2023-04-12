const { default: userEvent } = require('@testing-library/user-event');
const mongoose=require('mongoose');
const { Schema } =mongoose;

const ProductSchema = new Schema({
    prod_id:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        required:true
    }, 
    qnty:{
        type:Number,
        required:true
    },
    cat_id:{
        type:String,
        required:true
    },
    sal_price:{
        type:Number,
        required:true
    },
    brand_name:{
        type:String,
        required:true
    }
  });

  const Product = mongoose.model('product',ProductSchema);
  module.exports = Product;