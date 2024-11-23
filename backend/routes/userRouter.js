const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/users.js');

router.post('/create', async (req, res) =>{
    try{
        const searchResult = await Users.findOne({email: req.body.email});
        if (!searchResult){
            const user = new Users({
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10),
                name: req.body.name,
                phone: req.body.phone
            });
            const savedUser = await user.save();
            const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '30d'});
            res.cookie('token',token, {httpOnly: true, maxAge: 30*24*60*60*1000});
            res.json({message: 'created user', token});
        }
        else{
            //email already in use
            res.json({message: 'email already in use; user not created'});
        }
    }
    catch(err){
        res.json({message: err.message});
    }
});

//useful for when frontend sends request to check token
router.post('/verify-token', async (req, res) =>{
    let token = req.cookies.token;
    if(!token){
        res.json({message: 'NO LOGIN TOKEN IN REQUEST', isValidToken: false});
    }
    else{
        try{
            let decoded = jwt.verify(token, process.env.JWT_SECRET, {maxAge: '3d'});
            res.json({message: 'logged in', email: decoded.email, id : decoded.id, isValidToken: true});
        }
        catch(err){
            res.json({messgae: err.messag, isValidToken: false});
        }
    }
});

router.post('/login', async (req, res) =>{
    try{
        const searchResult = await Users.findOne({email: req.body.email});
        if (!searchResult){
            res.json({message: 'NO PROFILE MATCHING LOGINID'});
        }
        else{
            const isPasswordValid = await bcrypt.compare(req.body.password, searchResult.password);
            if(isPasswordValid){
                let token = jwt.sign({id: searchResult._id, email: searchResult.email}, process.env.JWT_SECRET, {expiresIn: '30d'});
                res.cookie('token',token, {httpOnly: true, maxAge: 30*24*60*60*1000});
                res.json({message: 'AUTHORIZED FOR ' + req.body.email});
            }
            else{
                res.json({message: 'INVALID PASSWORD'});
        }

        }
    }
    catch(err){
        res.json({message: err.message});
    }
});

router.post('/logout', async (req, res) =>{
    //logs out any account by deleting session token on client
    res.clearCookie('token');
    res.json({message: 'logged out'});
});

module.exports = router;