const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Listings = require('../models/listings.js');
const validator = require('validator');
const Users = require('../models/users.js');
//const Buffer = require('buffer/').Buffer

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const fs = require('fs-extra');
const path = require('node:path');
const mongoose = require('mongoose');

//const { findById } = require('../models/users.js');

//assuming frontend will get values from backend that lets the frontend decide redirects when neccessary

//current version does not work with pictures
//current versions allow for multiple listings with the same address

//discussion topic: are inactive listings deleted or should they be labelled "active: false"?
//currently just assumes they are deleted



//reused middleware function find and get user info based on token cookie
//also used to determine is client logged in or not
const findUserById = async function(req, res, next){
    const token = req.cookies.token;
    if(!token){
        res.json({message: 'NO LOGIN TOKEN IN REQUEST', isValidToken: false});
    }
    else{
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET, {maxAge: '30d'});
            req.user_id = decoded.id;
            next();
        }
        catch(err){
            res.json({message: err.message});
        }
    }
}

router.post('/create', findUserById, async (req, res) =>{
    try{
        const listing = new Listings({
            owner: req.user_id,
            price: req.body.price,
            address: req.body.address,
            type: (req.body.type).toLowerCase()
        });
        const savedListing = await listing.save();
        res.json({message: 'created listing'});
    }
    catch(err){
        res.json({message: err.message});
    }
});

/* DO NOT USE THIS COMMENTED SECTION; GO TO /create3
//to test picture uploads
router.post('/create2', findUserById, async (req, res) =>{
    //console.log (req.body);
    //diagnostic
    // let price = req.body.price;
    // let address = req.body.address;
    // let type = (req.body.type).toLowerCase();
    //let pictures = req.body.pictures;
    try{
        const listing = new Listings({
            owner: req.user_id,
            price: req.body.price,
            address: req.body.address,
            type: (req.body.type).toLowerCase(),
            //pictures: req.body.pictures
        });
        const savedListing = await listing.save();
        res.json({message: 'created listing', id: savedListing._id});
    }
    catch(err){
        res.json({message: err.message});
    }
});

router.post('/create-photo', upload.single('pictures'), async (req, res) => {
    const id = req.get('listing_id');
    let pictures = req.file;
    console.log(id);
    console.log(pictures);
    try{
        const listing = await Listings.findById(id);
        listing.pictures = pictures;
        const savedListing = await listing.save();
        res.json({message: 'asdf'});
    }
    catch(err){
        res.json({message: err.message});
    }
    
});
*/

router.post('/create3', findUserById, upload.single('pictures'), async (req, res) => {
    try{
        let owner = req.user_id;
        let price = req.body.price;
        let address = req.body.address;
        let type = (req.body.type).toLowerCase();   
        
        let pictures = {
            data: req.file.buffer,
            contentType: 'image/png'
        }
        const listing = new Listings({
            owner,
            price,
            address,
            type,
            pictures
        });
        const savedListing = await listing.save();
        res.json({message: 'created listing'});
    }
    catch(err){
        console.log(err);
        res.json({message: err.message});
    }
    
    
});

//read single listing with query string using id (for pages showing details on one listing)
router.get('/listing/:id', async (req, res) =>{
    try{
        const searchResult = await Listings.findById(req.params.id);
        if (searchResult){
            res.json(searchResult);
        }
        else{
            res.json({message: 'no listing found with request id'});
        }
    }catch(err){
        res.json({message: err.message});
    }
});


//renders and stores base64 buffer to backend as png file
//has potential with react
//failed for static html
router.get('/listing2/:id', async (req, res) =>{
    try{
        //console.log(req.params.id)
        const searchResult = await Listings.findById(req.params.id);
        if (searchResult){
            fs.outputFileSync(path.join(__dirname, '/../photoTest/pics/photo1.png'), searchResult.pictures.data);
            res.sendFile(path.join(__dirname, '/../photoTest/pics/photo1.png'));
        }
        else{
            res.json({message: 'no listing found with request id'});
        }
    }catch(err){
        console.log(err);
        try{
            res.json({message: err.message});
        }
        catch(e){
            console.log(e);
        }
    }
});


/*
//attempt 3 send image
//failed; here for reference
router.get('/listing3/:id', async (req, res) =>{
    try{
        //console.log(req.params.id)
        const searchResult = await Listings.findById(req.params.id);
        if (searchResult){
            res.json(searchResult);
        }
        else{
            res.json({message: 'no listing found with request id'});
        }
    }catch(err){
        console.log(err);
        try{
            res.json({message: err.message});
        }
        catch(e){
            console.log(e);
        }
    }
});
*/

/*
//attempt 4 send image
//works for static html
router.get('/listing4/:id', async (req, res) =>{
    console.log(req.params.id);
    if (mongoose.isValidObjectId(req.params.id)){
        try{
            
            const searchResult = await Listings.findById(req.params.id);
            if (searchResult){
                await fs.outputFileSync(path.join(__dirname, '/photoTest/photo1.png'), searchResult.pictures.data);
                res.sendFile(__dirname + '/photoTest/testPhoto3.html');
            }
            else{
                res.json({message: 'no listing found with request id'});
            }
        }catch(err){
            console.log(err);
            try{
                res.json({message: err.message});
            }
            catch(e){
                console.log(e);
            }
        }
    }
    else if (req.params.id === 'testPhoto3.js'){
        res.sendFile(__dirname + '/photoTest/testPhoto3.js');
    }
    else if (req.params.id === 'photo1.png'){
        res.sendFile(__dirname + '/photoTest/photo1.png');
    }
});
*/

//read with query strings using owner name, owner email, address or type (for search result pages)
//implementation requires exact strings to match
//no string means search all
//implementation done without aggregation functions to join tables
//DOES NOT SEND PICTURES; sends text data only
// /api-listings/listing2/:id RETURNS ONE PICTURE PER LISTING ID SENT
//note: potential future improvements includes searching with owner id and listing id too
router.get('/search', async (req, res) =>{
    const searchstring = req.query.searchstring;
    //NOTE searchstring is ALL LOWERCASE in the url and in this function
    //varable here was adjusted to match url query
    try{
        if(!searchstring){
            //empty searchstring means return all
            const listings = await Listings.find();
            res.json(listings);
        }
        else{
            //find the owner id based on the owner parameters first to find relevant listings
            const owners = await Users.find({$or: [{email: searchstring}, {name: searchstring}]});
            let owner_id_arr = [];
            owners.forEach((owner) =>{
                owner_id_arr.push(owner.id);
            });
            const listings = await Listings.find({$or: [{address: searchstring}, {type: searchstring}, {owner: {$in: owner_id_arr}}]})
            res.json(listings);
        }
    }
    catch(err){
        res.json({message: err.message});
    }
});

//update listing
//if field is left blank in request, it does not change
//images not considered in this version
//minor note: updatedAt timestamp does not update with update
router.patch('/update', findUserById, async (req, res) => {
    const id = req.body.id;    //this is not changed, it is only used to search for the document being changed
    const price = req.body.price;
    const address = req.body.address;
    
    
    try{
        const type = (req.body.type).toLowerCase();
        const searchResult = await Listings.findById(id);
        if (!searchResult){
            res.json({message: 'no listing found with request id'});
        }
        else if(req.user_id == searchResult.owner){
            searchResult.price = price || searchResult.price;
            searchResult.address = address || searchResult.address;
            searchResult.type = type || searchResult.type;
            //program crashes if manual validate does not occur before save for invalid type enum
            const commentValidate = searchResult.validateSync();
            if (!commentValidate){
                await searchResult.save();
                res.json({message: 'updated ' + id, searchResult});
            }
            else{
                res.json({commentValidate})
            }
        }
        else{
            res.json({mesasge: 'non-owner trying to update'});
        }
        
    }
    catch(err){
        res.json({message: err.message});
    }
});


//delete listing; remove from database
router.delete('/delete', findUserById, async (req, res) =>{
    try{
        const searchResult = await Listings.findById(req.body.id);
        //checks is listing owner id the same as token id
        if (!searchResult){
            res.json({message: 'no listing found with req.query.listingid'});
        }
        else if (req.user_id == searchResult.owner){
            const listing_id = searchResult._id;
            searchResult.deleteOne();
            res.json({message: 'deleted listing ' + listing_id});
        }
        
        else{
            res.json({message: 'non-owner trying to delete listing'});
        }
    }
    catch(err){
        res.json({message: err.message});
    }
});


module.exports = router;

