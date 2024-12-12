import React from 'react';
import {useState} from 'react';
import './listingSearch.css';

import axios from 'axios';

function ListingSearch(){

    const [listingList, setListingList] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        //searchstring is all lowercase
        const searchstring = document.getElementById("searchBar").value;
        let fetchURL = "/api-listings/search"
        if(searchstring){
            fetchURL = fetchURL + "?searchstring=" + searchstring;
        }

        //fetch(fetchURL, {method: "GET"})
        axios.get(fetchURL)
        .then( async res => { 
            //const obj = await res.json();
            const obj = await res.data;
            console.log(obj);
            setListingList(obj);
        })
        .catch( err => {console.log("Error! " + err)} );
        
    }

    function ListingBoxes(){
        if(listingList){

            return(
                <div>
                    {listingList.map( (listing) => {
                        console.log(listing._id);

                        return(
                            <ListingBox key={listing._id} listing={listing} />
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
        
        let [imageURL, setImageURL] = useState("");

        console.log(imageURL);
        return(    
            <div key={listing._id} className="listingBox">
                <p>Owner ID: {listing.owner}</p>
                <p>Address: {listing.address}</p>
                <p>Type: {listing.type}</p>
                <p>Price: {listing.price}</p>
                <ListingPic getter={imageURL} setter={setImageURL} listing={listing} />
            </div>
            );
    }

    function ListingPic(props){

        let imageURL = props.getter;
        let setImageURL = props.setter;
        let listing = props.listing;

        let tempFile = "";
        let tempURL = "";

        if(imageURL == ""){
            
            try{
                //fetch("/api-listings/listing2/" + listing._id, {method: "GET"})
                axios.get("/api-listings/listing2/" + listing._id, {responseType: "blob"})
                .then( async res => {
                    //tempFile = await res.blob();
                    tempFile = await res.data;
                    console.log(tempFile);
                    tempURL = URL.createObjectURL(tempFile);
                    //console.log(tempURL);
                    setImageURL(tempURL);
                })
                .catch( err => {console.log("Error! " + err)} );
            }
            catch(err){
                console.log(err);
            }
        }

        return(
            <img src={imageURL} alt={"an image goes here"}></img>
        );
        
    }

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