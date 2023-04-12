const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();


router.get('/',async (req,res)=>{
   const customers = await Customer.find();
   res.json(customers)
})

router.post('/createCustomer',async (req,res)=>{
   const customers = await Customer.find();
   var cust_id;

   if(customers==''){
       cust_id = 'CUST1';
   }
   else{
        customers.forEach(cust_fetched => {
            cust_id=cust_fetched['cust_id']
        });
        cust_id = cust_id.substring(0,4)+(parseInt(cust_id.substring(4))+1)
   }

   const { name, phone, password, email , address} = req.body;
   const customer = new Customer({
       name, phone, password, email, address, cust_id:cust_id
   })
   const savedCustomer = await customer.save();
   res.json(savedCustomer)
})

module.exports = router;