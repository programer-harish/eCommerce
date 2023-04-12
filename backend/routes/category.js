const express = require('express');
const Category = require('../models/Category');
const router = express.Router();


router.get('/',async (req,res)=>{
    const categories = await Category.find();
    res.json(categories)
})

router.post('/createCategory',async (req,res)=>{
    const categories = await Category.find();
    var cat_id;

    if(categories==''){
        cat_id = 'CAT1';
    }
    else{
         categories.forEach(category_fetched => {
             cat_id=category_fetched['cat_id']
         });
         cat_id = cat_id.substring(0,3)+(parseInt(cat_id.substring(3))+1)
    }

    const { name, plus_price } = req.body;
    const category = new Category({
        name, plus_price, cat_id:cat_id
    })
    const savedCategory = await category.save();
    res.json(savedCategory)
})

module.exports= router;