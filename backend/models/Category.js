const { default: userEvent } = require('@testing-library/user-event');
const mongoose=require('mongoose');
const { Schema } =mongoose;

const CategorySchema = new Schema({
    cat_id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    active:{
        type:String,
        default:'Y',
        required:true
    }
  });

  const Category = mongoose.model('category',CategorySchema);
  module.exports = Category;