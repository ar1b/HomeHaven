const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/users.js');

//creates user
//will not allow for an account to be created with an email in use
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
            res.cookie('token', token, {httpOnly: true, maxAge: 30*24*60*60*1000});
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

//checks is token valid
//useful for when frontend sends request to check token
router.post('/verify-token', async (req, res) =>{
    const token = req.cookies.token;
    if(!token){
        res.json({message: 'NO LOGIN TOKEN IN REQUEST', isValidToken: false});
    }
    else{
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET, {maxAge: '30d'});
            res.json({message: 'logged in', email: decoded.email, id : decoded.id, isValidToken: true});
        }
        catch(err){
            res.json({message: err.message, isValidToken: false});
        }
    }
});

//update
//assumes user is logged in
//assumes user will be redirected to log in page if they are not logged in
router.patch('/update', async (req, res) => {
    const token = req.cookies.token;
    console.log(token);
    if(!token){
        res.json({message: 'NO LOGIN TOKEN IN REQUEST', isValidToken: false});
    }
    else{
        try{
            //token = req.cookies.token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET, {maxAge: '30d'});
            
            const id = decoded.id;
            const searchResult = await Users.findById(id);

            searchResult.email = req.body.email || searchResult.email;
            searchResult.password = await bcrypt.hash(req.body.password, 10) || searchResult.password;
            searchResult.name = req.body.name || searchResult.name;
            searchResult.phone = req.body.phone || searchResult.phone;
            await searchResult.save();

            const newToken = jwt.sign({id: searchResult._id, email: searchResult.email}, process.env.JWT_SECRET, {expiresIn: '30d'});
            res.cookie('token', newToken, {httpOnly: true, maxAge: 30*24*60*60*1000});
            res.json({message: 'updated user ' + searchResult.email, newToken});
        }
        catch(err){
            res.json({message: err.message, isValidToken: false});
        }
    }
});

//login
//frontend should not allow logged in users to reach the page that uses this API
router.post('/login', async (req, res) =>{
    try{
        const searchResult = await Users.findOne({email: req.body.email});
        if (!searchResult){
            res.json({message: 'NO PROFILE MATCHING LOGINID'});
        }
        else{
            const isPasswordValid = await bcrypt.compare(req.body.password, searchResult.password);
            if(isPasswordValid){
                const token = jwt.sign({id: searchResult._id, email: searchResult.email}, process.env.JWT_SECRET, {expiresIn: '30d'});
                res.cookie('token', token, {httpOnly: true, maxAge: 30*24*60*60*1000});
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

//logout
router.post('/logout', async (req, res) =>{
    //logs out any account by deleting session token on client
    res.clearCookie('token');
    res.json({message: 'logged out'});
});

module.exports = router;