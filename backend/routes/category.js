const express = require('express');
const Category = require('../models/Category');
const router = express.Router();


router.get('/',async (req,res)=>{
    const categories = await Category.find({active:'Y'});
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

    const { name } = req.body;
    const category = new Category({
        name, cat_id:cat_id
    })
    const savedCategory = await category.save();
    res.json(savedCategory)
})

router.delete('/delete',async (req,res)=>{
    const {cat_id} = req.body;
    let category = await Category.findOne({ cat_id:cat_id});
    if(!category){
        res.json({success:false,message:"Not found"});
    }
    else{
        let category = await Category.findOneAndUpdate({ cat_id:cat_id},{active:'N'});
        res.json({success:true,message:"Category Deleted"});
    }
})
router.put('/update',async (req,res)=>{
    const {cat_id, name} = req.body;
    let category = await Category.findOne({ cat_id:cat_id});
    if(!category){
        res.json({success:false,message:"Not found"});
    }
    else{
        let newCategory = await Category.findOneAndUpdate({ cat_id:cat_id},{name:name});
        res.json({success:true,message:"Category Updated"});
    }
})
module.exports= router;