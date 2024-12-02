import React from 'react';
import {useState} from 'react';
import './listingSearch.css';

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

        await fetch(fetchURL)
            .then( async res => { 
                const obj = await res.json();
                console.log(obj[0]);
                setListingList(obj);
            })
            .catch( err => {console.log("Error! " + err)} );
    }
    
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
/*
    function ListingBox(){
        return(

        );
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