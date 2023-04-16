const express = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category');
const router = express.Router();


router.get('/',async (req,res)=>{
    const products = await Product.find();
    res.json(products)
})

router.post('/createProduct',async (req,res)=>{
    const products = await Product.find();
    var prod_id;

    if(products==''){
        prod_id = 'PROD1';
    }
    else{
         products.forEach(product_fetched => {
             prod_id=product_fetched['prod_id']
         });
         prod_id = prod_id.substring(0,4)+(parseInt(prod_id.substring(4))+1)
    }
    
    const { cat_id, name, desc, pic, qnty, brand_name } = req.body;
    const category=await Category.find({ cat_id:cat_id })
    //plus price needs to be sum with pur_price | sal_price=pur_price + plus_price
    var plus_price=0;
    category.forEach(category_fetched => {
        plus_price=category_fetched['plus_price']
    });
    const product = new Product({
        name, desc, pic, qnty, brand_name, sal_price:plus_price, prod_id:prod_id, cat_id:cat_id
    })
    const savedProduct = await product.save();
    res.json(savedProduct)
})

module.exports= router;