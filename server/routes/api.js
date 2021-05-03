const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/miniProject',{
    useCreateIndex:true,
    useNewUrlParser:true, 
    useUnifiedTopology:true
}).then(()=>{
    console.log('MongoDB connection successful');
}).catch(err=>{
    console.log(err);
    console.log('failed');
})


//A middleware is a func that gets executed before user defined handler is executed
function verifyToken(req,res,next){
    //check authorization key is present
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request');
    }
    //if present get the first index because 0 index is bearer
    let token = req.headers.authorization.split(' ')[1]
    if(token==='null'){
        return res.status(401).send('Unauthorized request');
    }
    //secretKey
    let payload = jwt.verify(token,'secretKey')
    //no payload return 401
    if(!payload){
        return res.status(401).send('Unauthorized request');
        //verifies and returns true if token is verified else false
    }
    res.userId=payload.subject
    //pass the execution to next handler line 46
    next()
}

router.get('/',(req,res)=>{
    res.send('Ironman Demo')
})

router.get('/special',verifyToken,(req,res)=>{
    let secretMessage = {"message":'This is the secret that you were looking for'};
    res.json(secretMessage);
})


router.post('/register',(req,res)=>{
    let userData = req.body;
    let user1 = new User(userData);

    user1.save((error, regUser)=>{
        if(error){
            console.log(error);
        }
        else{
            res.status(200).send(regUser);
        }
    })
})

router.post('/login',(req,res)=>{
    let userData=req.body;
    User.findOne({email:userData.email},(error,user)=>{
        if(error){
            console.log(error);
        }
        else{
            if(!user){
                res.status(401).send('Invalid email');
            }
            else{
                if(user.password!==userData.password){
                res.status(401).send('Invalid password');
                }
                else{
                    let payload = { subject : user._id};
                    let token = jwt.sign(payload,'secretKey');
                    //res.status(200).send(user);
                    res.status(200).send({token});
                }
            }
        }
    })
})

module.exports=router;