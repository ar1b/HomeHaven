import React from 'react';
import {useState} from 'react';
import './listingSearch.css';

function ListingSearch(){

    const [listingList, setListingList] = useState();

    //let previewPics = [];
    //let [previewPics, setPreviewPics] = useState([]);   //array to hold temporary picture URLs
    //let previewPics = []; 
    //let previewPicsCounter = 0; //counter to decide which image to use for each listing component

    const handleSubmit = async (e) => {
        e.preventDefault();

        //previewPics = [];
        //setPreviewPics([]);
        //previewPicsCounter = 0;

        //searchstring is all lowercase
        const searchstring = document.getElementById("searchBar").value;
        let fetchURL = "/api-listings/search"
        if(searchstring){
            fetchURL = fetchURL + "?searchstring=" + searchstring;
        }

        fetch(fetchURL)
        .then( async res => { 
            const obj = await res.json();
            //console.log(obj[0]);
            setListingList(obj);
            //configPreviewPics();
            //console.log(previewPics);
        })
        .catch( err => {console.log("Error! " + err)} );
        
    }
/*
    function configPreviewPics(){

        console.log(listingList);

        let tempState;
        let tempSet;

        let tempFile = "";
        let tempURL = "";

        if(listingList){
            listingList.forEach( (listing) => {
                fetch("/api-listings/listing2/" + listing._id)
                .then( async res => {
                    tempFile = await res.blob();
                    tempURL = URL.createObjectURL(tempFile);
                    console.log(tempURL);
                    console.log(previewPics);
                    setPreviewPics([...previewPics, tempURL]);
                    //previewPics.push(tempURL);
                })
                .catch( err => {console.log("Error! " + err)} );
            });
        }
        
    }
  */
/*asdfasdfasdf
    function ListingBoxes(){
        console.log(listingList);

        if(listingList){

            return(
                <div>
                    {listingList.map( (listing) => {
                        console.log(listing._id);

                        return(    
                        <div key={listing._id} className="listingBox">
                            <p>Owner ID: {listing.owner}</p>
                            <p>Address: {listing.address}</p>
                            <p>Type: {listing.type}</p>
                            <p>Price: {listing.price}</p>
                            <ListingPic picID={listing._id} />
                        </div>
                        );
                    })}
                </div>
            );
        }
        else{
            return(
                <div>
                    
                </div>
            );
        }
    }*/
/*
    function ListingBoxes(){
        if(listingList){

            return(
                <div>
                    {listingList.map( (listing) => {
                        console.log(listing._id);

                        

                        let [imageURL, setImageURL] = useState();

                        let tempFile = "";
                        let tempURL = "";
                        
                        try{
                            fetch("/api-listings/listing2/" + listing._id)
                            .then( async res => {
                                tempFile = await res.blob();
                                tempURL = URL.createObjectURL(tempFile);
                                console.log(tempURL);
                                setImageURL(tempURL);
                            })
                            .catch( err => {console.log("Error! " + err)} );
                        }
                        catch(err){
                            console.log(err);
                        }


                        return(    
                        <div key={listing._id} className="listingBox">
                            <p>Owner ID: {listing.owner}</p>
                            <p>Address: {listing.address}</p>
                            <p>Type: {listing.type}</p>
                            <p>Price: {listing.price}</p>
                            <ListingPic image={imageURL} />
                        </div>
                        );
                        
                    })}
                </div>
            );
        }
        else{
            return(
                <div>
                    
                </div>
            );
        }
    }
        */

    function ListingBoxes(){
        if(listingList){

            return(
                <div>
                    {listingList.map( (listing) => {
                        console.log(listing._id);

                        let tempFile = "";
                        let tempURL = "";
                        
                        try{
                            fetch("/api-listings/listing2/" + listing._id)
                            .then( async res => {
                                tempFile = await res.blob();
                                tempURL = await URL.createObjectURL(tempFile);
                                console.log(tempURL);
                               //setImageURL(tempURL);
                            })
                            .catch( err => {console.log("Error! " + err)} );
                        }
                        catch(err){
                            console.log(err);
                        }

                        return(
                            <ListingBox key={listing._id} listing={listing} tempURL={tempURL} />
                        );
                        
                    })}
                </div>
            );
        }
        else{
            return(
                <div>
                    
                </div>
            );
        }
    }

    function ListingBox(props){
        
        let listing = props.listing;
        let tempURL = props.tempURL;
        //let setImageURL = props.setter;
        //let imageURL = props.getter;
        
        let [imageURL, setImageURL] = useState(tempURL);

        return(    
            <div key={listing._id} className="listingBox">
                <p>Owner ID: {listing.owner}</p>
                <p>Address: {listing.address}</p>
                <p>Type: {listing.type}</p>
                <p>Price: {listing.price}</p>
                <ListingPic image={tempURL} />
            </div>
            );
    }

    /*
    function ListingBoxes(){
        if(listingList){

            return(
                <div>
                    {listingList.map( (listing) => {
                        console.log(listing._id);

                        let tempFile = "";
                        let tempURL = "";

                        let [imgURL, setImageURL] = useState();
                        
                        try{
                            fetch("/api-listings/listing2/" + listing._id)
                            .then( async res => {
                                tempFile = await res.blob();
                                tempURL = URL.createObjectURL(tempFile);
                                console.log(tempURL);
                                setImageURL(tempURL);
                            })
                            .catch( err => {console.log("Error! " + err)} );
                        }
                        catch(err){
                            console.log(err);
                        }


                        return(    
                        <div key={listing._id} className="listingBox">
                            <p>Owner ID: {listing.owner}</p>
                            <p>Address: {listing.address}</p>
                            <p>Type: {listing.type}</p>
                            <p>Price: {listing.price}</p>
                            <img src={imgURL} alt={"an image goes here"}></img>
                        </div>
                        );
                    })}
                </div>
            );
        }
        else{
            return(
                <div>
                    
                </div>
            );
        }
    }
        */

/*
    function ListingBoxes(){
        if(listingList){

            return(
                <div>
                    {listingList.map( (listing) => {
                        console.log(listing._id);
                        return(    
                        <div key={listing._id} className="listingBox">
                            <p>Owner ID: {listing.owner}</p>
                            <p>Address: {listing.address}</p>
                            <p>Type: {listing.type}</p>
                            <p>Price: {listing.price}</p>
                            <ListingPic picID={listing._id} />
                        </div>
                        );
                    })}
                </div>
            );
        }
        else{
            return(
                <div>
                    
                </div>
            );
        }
    }
        */

/*
    function ListingBoxes(){
        if(listingList){

            return(
                <div>
                    {listingList.map( (listing) => (    
                        <div className="listingBox">
                            <p>Owner ID: {listing.owner}</p>
                            <p>Address: {listing.address}</p>
                            <p>Type: {listing.type}</p>
                            <p>Price: {listing.price}</p>
                            <ListingPic picID={listing._id} />
                        </div>
                    ))}
                </div>
            );
        }
        else{
            return(
                <div>
                    
                </div>
            );
        }
    }
*/

/*
    function ListingBoxes(){
        if(listingList){  
            return(
                <>
                    {listingList.map((listing) => (
                        <ListingBox dispContents={listing} />
                    ))}
                </>
            );  
        }
        else{
            return(
                <div>
                    
                </div>
            );
        }
    }
*/


function ListingPic(props){

    let picURL = props.image;

    return(
        <img src={picURL} alt={"an image goes here"}></img>
    );
    
}

    /*
    function ListingPic(props){

        let picID = props.picID;

        let tempFile = "";
        let tempURL = "";

        let [imgURL, setImageURL] = useState();
        
        try{
            fetch("/api-listings/listing2/" + picID)
            .then( async res => {
                tempFile = await res.blob();
                tempURL = URL.createObjectURL(tempFile);
                console.log(tempURL);
                setImageURL(tempURL);
            })
            .catch( err => {console.log("Error! " + err)} );
        }
        catch(err){
            console.log(err);
        }

        return(
            <img src={imgURL} alt={"an image goes here"}></img>
        );
        
    }
        */
    
/*
    function ListingPic(props){

        let picID = props.picID;

        let tempFile = "";
        let tempURL = "";
        
        try{
            fetch("/api-listings/listing2/" + picID)
            .then( async res => {
                tempFile = await res.blob();
                tempURL = URL.createObjectURL(tempFile);
                console.log(tempURL);
            })
            .catch( err => {console.log("Error! " + err)} );
        }
        catch(err){
            console.log(err);
        }

        return(
            <>
            </>
        );
        
    }
        */

    /*
    async function ListingBox(props){
        
        let listing = props.dispContents;

        let tempFile = "";
        let tempURL = "";
        
        try{
            await fetch("/api-listings/listing2/" + listing._id)
            .then( async res => {
                tempFile = await res.blob();
                tempURL = URL.createObjectURL(tempFile);
                console.log(tempURL);
            })
            .catch( err => {console.log("Error! " + err)} );
        }
        catch(err){
            console.log(err);
        }
        
        return(
            <div>
                <div className="listingBox">
                    <p>Owner ID: {listing.owner}</p>
                    <p>Address: {listing.address}</p>
                    <p>Type: {listing.type}</p>
                    <p>Price: {listing.price}</p>
                    <img src={tempURL} alt={"an image goes here"}></img>
                </div>
            </div>
        );
    }
    */

    /*
    //old version for reference
    function ListingBoxes(){
        if(listingList){
            return(
                <div>
                    {listingList.map( (listing) => (    
                        <div className="listingBox">
                            <p>Owner ID: {listing.owner}</p>
                            <p>Address: {listing.address}</p>
                            <p>Type: {listing.type}</p>
                            <p>Price: {listing.price}</p>
                        </div>
                    ))}
                </div>
            );
        }
        else{
            return(
                <div>
                    
                </div>
            );
        }
    }
        */


    return (
        <div className="mainPart">
            <h2>Search Page</h2>
            <div>
                <label htmlFor="searchBar">Search:</label>
                <input id="searchBar" name="searchBar" type="text" placeholder="Enter Search" />
                <br/>
                <button id="submitBtn" onClick={handleSubmit}>Search</button>
                <br/>
                <br/>

            </div>
            <ListingBoxes />
        </div>
    );
}

export default ListingSearch;