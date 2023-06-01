const express = require('express');
const Product = require('../models/Product');
const router = express.Router();


router.get('/', async (req, res) => {
    let products = await Product.find({ active: 'Y' });
    res.json(products)
})

router.post('/createProduct', async (req, res) => {
    let products = await Product.find();
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
    
    const { cat_id, name, desc, brand_name, sal_price } = req.body;
    errMsg = ''    
    
        var file = req.files.prodImg
        var path = `backend/images/product/${prod_id}.jpg`
        
            file.mv(path, function (err) {
                if (err) {
                    errMsg = err
                }
            })
    

    // // below needs reviewed and removed
    // // const category=await Category.find({ cat_id:cat_id })
    // // //plus price needs to be sum with pur_price | sal_price=pur_price + plus_price
    // // var plus_price=0;
    // // category.forEach(category_fetched => {
    // //     plus_price=category_fetched['plus_price']
    // // });
    const product = new Product({
        name, desc, qnty:0, brand_name, sal_price:sal_price, prod_id:prod_id, cat_id:cat_id
    })
    let savedProduct = await product.save();
    res.json({success:true,message:"Product created",prod_id:prod_id})
})
router.post('/byCategory', async (req, res) => {
    const { cat_id } = req.body;
    let products = await Product.find({ cat_id: cat_id });
    res.json(products)
})
router.put('/update', async (req, res) => {
    const { prod_id, name, sal_price } = req.body;
    let product = await Product.findOne({ prod_id: prod_id });
    if (!product) {
        res.json({ success: false, message: "Not found" });
    }
    else {
        let newProduct = await Product.findOneAndUpdate({ prod_id: prod_id }, { name: name, sal_price: sal_price });
        res.json({ success: true, message: "Product Updated" });
    }
})
router.delete('/delete', async (req, res) => {
    const { prod_id } = req.body;
    let product = await Product.findOne({ prod_id: prod_id });
    if (!product) {
        res.json({ success: false, message: "Not found" });
    }
    else {
        let product = await Product.findOneAndUpdate({ prod_id: prod_id }, { active: 'N' });
        res.json({ success: true, message: "Product Deleted" });
    }
})
module.exports = router;