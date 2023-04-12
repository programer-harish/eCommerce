const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();


router.get('/',async (req,res)=>{
    const cart = await Cart.find();
    res.json(cart)
})

router.post('/updateCart:cust_id',async (req,res)=>{

    const { prod_id, qnty,cat_id} = req.body;
    let cust_id= req.params.cust_id;
    cust_id=cust_id.substring(1);
    //res.json(cust_id)
    let cart = await Cart.find({cust_id:cust_id, prod_id:prod_id,cat_id:cat_id});
    // newCart to be saved
    
    
    if(cart == ''){
        const newCart= new Cart({
            prod_id, qnty, cust_id, cat_id
        })
        const savedCart = await newCart.save();
        res.json(savedCart)
    }
    else {
        const updateCart= ({
            qnty:qnty
        })
        cart = await Cart.updateOne({cust_id:cust_id,prod_id:prod_id,cat_id:cat_id},updateCart);
        res.json("Cart Updated")
    }
})

module.exports= router;