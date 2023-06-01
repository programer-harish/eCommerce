const express = require('express');
const Purchase_detail = require('../models/Purchase_detail');
const Purchase_master = require('../models/Purchase_master');
const Product = require('../models/Product');
const router = express.Router();


router.get('/', async (req, res) => {
    let purchases = {};
    const purchase_master = await Purchase_master.find();
    const purchase_detail = await Purchase_detail.find();

    res.json({ purchase_master, purchase_detail })
    // for(const purchase_fetched of purchase_master){
    //     const purchase_detail = await Purchase_detail.find(purchase_fetched['pur_id'])
    // }
})

router.post('/stockPurchase', async (req, res) => {
    const purchase_master = await Purchase_master.find();
    var pur_id='';

    if (purchase_master == '') {
        pur_id = 'PUR1';
    }
    else {
        purchase_master.forEach(purchase_fetched => {
            pur_id = purchase_fetched['pur_id']
        });
        pur_id = pur_id.substring(0, 3) + (parseInt(pur_id.substring(3)) + 1)
    }

    const { user_id, prod_ids, qntys, cat_ids, pur_prices} = req.body;
    const newPurMaster = new Purchase_master({
        pur_id: pur_id,
        user_id: user_id
    })
    const savedPurMaster = await newPurMaster.save();
    for (let i = 0; i < prod_ids.length; i++) {
        let product = await Product.find({ prod_id: prod_ids[i], cat_id: cat_ids[i] })
        //sale price fetched from products
        let current_qnty =0;
        product.forEach(product_fetched => {
            current_qnty = product_fetched['qnty']
        });
        const newQnty=current_qnty + qntys[i];
        const newPurDetail = new Purchase_detail({
            pur_id: pur_id,
            prod_id: prod_ids[i],
            qnty: qntys[i],
            cat_id: cat_ids[i],
            pur_price: pur_prices[i],
        })
        const savedPurDetail=await newPurDetail.save();
        product = await Product.updateOne({prod_id: prod_ids[i], cat_id: cat_ids[i]},{qnty:newQnty});
    }
    if(pur_id!='')
    res.json({success:true,message:"Stock saved",pur_id:pur_id});
    else
    res.json({success:false,message:"Error saving"});
})

module.exports = router;