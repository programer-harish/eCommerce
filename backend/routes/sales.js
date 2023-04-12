const express = require('express');
const Sales_detail = require('../models/Sales_detail');
const Sales_master = require('../models/Sales_master');
const Product = require('../models/Product');
const router = express.Router();


router.get('/', async (req, res) => {
    
    const sales_master = await Sales_master.find();
    const sales_detail = await Sales_detail.find();

    res.json({ sales_master, sales_detail })
    // for(const purchase_fetched of sales_master){
    //     const purchase_detail = await Purchase_detail.find(purchase_fetched['sal_id'])
    // }
})

router.post('/stockSale', async (req, res) => {
    const sales_master = await Sales_master.find();
    var sal_id;

    if (sales_master == '') {
        sal_id = 'SAL1';
    }
    else {
        sales_master.forEach(sale_fetched => {
            sal_id = sale_fetched['sal_id']
        });
        sal_id = sal_id.substring(0, 3) + (parseInt(sal_id.substring(3)) + 1)
    }

    const { cust_id, prod_ids, qntys, cat_ids} = req.body;
    const newSaleMaster = new Sales_master({
        sal_id: sal_id,
        cust_id: cust_id
    })
    const savedSalesMaster = await newSaleMaster.save();
    console.log(savedSalesMaster)
    for (let i = 0; i < prod_ids.length; i++) {
        let product = await Product.find({ prod_id: prod_ids[i], cat_id: cat_ids[i] })
        //sale price fetched from products
        let current_qnty =0;
        product.forEach(product_fetched => {
            sal_price = product_fetched['sal_price']
            current_qnty = product_fetched['qnty']
        });
        const newQnty=current_qnty - qntys[i];
        const newSalesDetail = new Sales_detail({
            sal_id: sal_id,
            prod_id: prod_ids[i],
            qnty: qntys[i],
            cat_id: cat_ids[i],
            sal_price: sal_price,
        })
        const savedSalesDetail=await newSalesDetail.save();
        console.log("Saved detail"+savedSalesDetail)
        product = await Product.updateOne({prod_id: prod_ids[i], cat_id: cat_ids[i]},{qnty:newQnty});
    }
    res.json("Stock Sold")
})

module.exports = router;