const { default: userEvent } = require('@testing-library/user-event');
const mongoose=require('mongoose');
const { Schema } =mongoose;

const CartSchema = new Schema({
    qnty:{
        type:Number,
        required:true
    },
    cust_id:{
        type:String,
        required:true,
        unique:true
    },
    prod_id:{
        type:String,
        required:true
    },
    cat_id:{
        type:String,
        required:true
    }
  });

  const Cart = mongoose.model('cart',CartSchema);
  module.exports = Cart;