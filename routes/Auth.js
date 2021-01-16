const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user');

router.get('/',(req,res) => {
    User.findOne({username:"Prateek"})
    .then((users) => {
        console.log(users);
    })
    .catch((error) => {
        console.log(error);
    })
})
router.post('/signup',(req,res)=>{
    const {username,password,email} = req.body 
    if(!username || !password || !email){
       return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({username:username})
    .then((Saveduser)=>{
        if(Saveduser){
          return res.status(422).json({error:"user already exists with that username"})
        }
        const user = new User({
            username,
            password,
            email
        })
        user.save()
        .then(user=>{
            res.json({message:"saved successfully"})
        })
        .catch(err=>{
            console.log(err)
        })
       
    })
    .catch(err=>{
      console.log(err)
    })
  })

  router.post('/signin',(req,res)=>{
    const {username,password} = req.body
    if(!username || !password){
       return res.status(422).json({error:"please add username or password"})
    }
    User.findOne({username:username})
    .then(User=>{
        if(!User){
           return res.status(422).json({error:"Invalid username"})
        }
        if(User.password === password){
           res.json({message:"successfully signed in"})
        }
        else{
            return res.status(422).json({error:"Invalid password"})
        }
    })
})

module.exports = router;