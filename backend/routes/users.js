 const express = require('express');
 const User = require('../models/User');
 const router = express.Router();


 router.get('/',async (req,res)=>{
    const users = await User.find();
    res.json(users)
 })

 router.post('/createUser',async (req,res)=>{
    const users = await User.find();
    var user_id;

    if(users==''){
        user_id = 'USER1';
    }
    else{
         users.forEach(user_fetched => {
             user_id=user_fetched['user_id']
         });
         user_id = user_id.substring(0,4)+(parseInt(user_id.substring(4))+1)
    }

    const { name, phone, password, email } = req.body;
    const user = new User({
        name, phone, password, email, user_id:user_id
    })
    const savedUser = await user.save();
    res.json(savedUser)
 })

 module.exports = router;