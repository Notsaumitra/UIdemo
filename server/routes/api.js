const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const sendEmail = require('../services/emailService');
//const Verify = require('../models/verify');
const v4 = require('uuid');

const User = require('../models/user')
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/miniProject', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connection successful');
}).catch(err => {
    console.log(err);
    console.log('failed');
})


//A middleware is a func that gets executed before user defined handler is executed
function verifyToken(req, res, next) {
    //check authorization key is present
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    //if present get the first index because 0 index is bearer
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    //secretKey
    let payload = jwt.verify(token, 'secretKey')
    //no payload return 401
    if (!payload) {
        return res.status(401).send('Unauthorized request');
        //verifies and returns true if token is verified else false
    }
    res.userId = payload.subject
    //pass the execution to next handler line 46
    next()
}

router.get('/', (req, res) => {
    res.send('Ironman Demo')
})

router.get('/special', verifyToken, (req, res) => {
    let secretMessage = { "message": 'This is the secret that you were looking for' };
    res.json(secretMessage);
})


router.get('/activateAccount/:token', async (req, res) => {
    try {
        const payload = jwt.verify(req.params.token, 'secret');
        res.userId = payload.user;
        console.log(payload.user);
        const user1 = await User.findOne({ _id: payload.user });
        console.log(user1.verified)
        await user1.updateOne({ verified: true })
        user1.save();
    } catch (error) {
        console.log(error);
    }

    return res.redirect('http://localhost:4200/login');
})


router.post('/register', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user); // null if user not present 
        if (user) {
            res.json({ 'message': "already registered" })
        }
        else {
            let userData = req.body;
            let user1 = new User(userData);
            await user1.save();
            /*
            const verDone = new Verify({
                code: v4(),
                codeType: "EMAIL_ACTIVATION",
                userId: user1.id
            })
            await verDone.save();*/

            const emailToken = jwt.sign(
                {
                    user: user1.id,
                },
                'secret',
                {
                    expiresIn: '1d'
                },
            );
            const url = `http://localhost:3000/api/activateAccount/${emailToken}`
            await sendEmail(url, user1.email, 'confirm your registration');
            res.json({ 'message': "success" });
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error);
        }
        else {
            if (!user) {
                res.status(401).send('Invalid email');
            }
            else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password');
                }
                else {
                    if(user.verified==false){
                        res.status(401).send('verify email');
                    }
                    else{
                        let payload = { subject: user._id };
                        let token = jwt.sign(payload, 'secretKey');
                        //res.status(200).send(user);
                        res.status(200).send({ token });
                    }
                }
            }
        }
    })
})

module.exports = router;