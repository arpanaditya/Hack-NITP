const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const requireLogin = require('../config/requirelogin');

router.get('/',(req,res) => {
    Product.find()
    .then((products)=>{
        res.json({products})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/create',requireLogin,(req,res)=>{
    const {name,description,image,price,quantity,address,contactNo,Days_For_Rent,category,babyage} = req.body 
    if(!name || !description || !image || !price || !quantity || !address || !contactNo || !category){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    req.user.password = undefined
    const product = new Product({
        name,
        description,
        image,
        price,
        quantity,
        address,
        contactNo,
        Days_For_Rent,
        category,
        babyage,
        user:req.user
    })
    product.save()
    .then(result=>{
        res.json({product:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router;