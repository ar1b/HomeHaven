const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Listings = require('../models/listings.js');
const Users = require('../models/users.js');
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
    const listing = new Listings({
        owner: req.user_id,
        price: req.body.price,
        address: req.body.address,
        type: (req.body.type).toLowerCase()
    });
    try{
        const savedListing = await listing.save();
        res.json({message: 'created listing'});
    }
    catch(err){
        res.json({message: err.message});
    }
});

//read single listing with query string using id (for pages showing details on one listing)
router.get('/listing/:id', async (req, res) =>{
    try{
        const searchResult = await Listings.findById(req.params.id);
        if (searchResult){
            res.json({searchResult});
        }
        else{
            res.json({message: 'no listing found with request id'});
        }
    }catch(err){
        res.json({message: err.message});
    }
});

//read with query strings using owner name, owner email, address or type (for search result pages)
//implementation requires exact strings to match
//implementation done without aggregation functions to join tables
//note: potential future improvements includes searching with owner id and listing id too
router.get('/search', async (req, res) =>{
    const searchstring = req.query.searchstring;
    //NOTE searchstring is ALL LOWERCASE in the url and in this function
    //varable here was adjusted to match url query
    try{
        //find the owner id based on the owner parameters first to find relevant listings
        const owners = await Users.find({$or: [{email: searchstring}, {name: searchstring}]});
        let owner_id_arr = [];
        owners.forEach((owner) =>{
            owner_id_arr.push(owner.id);
        });
        const listings = await Listings.find({$or: [{address: searchstring}, {type: searchstring}, {owner: {$in: owner_id_arr}}]})
        res.json({listings});
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
    const type = (req.body.type).toLowerCase();
    
    try{
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
                searchResult.save();
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

