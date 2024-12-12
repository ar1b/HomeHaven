
let listingsArr;

async function loadListings(){
    
    try{
        await fetch("http://localhost:3000/api-listings/search")
        .then( async res => {
            listingsArr = await res.json(); //promise results can't be printed directly?
            console.log(listingsArr);
        })
        .catch( err => {console.log("Error! " + err)} );
    }
    catch(err){
        console.log(err);
    }

    let listingsList = document.getElementById("listingsList");
    let counter = 1;
    let tempFile ="";
    let tempURL = "";
    let tempString = "";

    listingsArr.forEach(async listing => {

        

        /*
        //block with failed image test
        //DO NOT USE

        tempFile = new File(listing.pictures.data.data, "temp1.png", {type: "png/image"});
        tempURL = URL.createObjectURL(tempFile);

        tempString = `<h1>Listing #${counter}</h1>
        <p>
            Listing ID: ${listing._id}
            <br>
            Owner: ${listing.owner}
            <br>
            Address: ${listing.address}
            <br>
            Price: ${listing.price}
            <br>
            Type: ${listing.type}
            <br>
            <img src="${tempURL}" alt="an image goes here">
            <br><br>
        </p>
        `;
        //console.log(listingsArr[0].pictures.data.data);
        */

        try{
            await fetch("http://localhost:3000/api-listings/listing2/" + listing._id)
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

        console.log(tempFile);
        tempString = `<h1>Listing #${counter}</h1>
        <p>
            Listing ID: ${listing._id}
            <br>
            Owner: ${listing.owner}
            <br>
            Address: ${listing.address}
            <br>
            Price: ${listing.price}
            <br>
            Type: ${listing.type}
            <br>
            <img src="${tempURL}" alt="an image goes here">
            <br><br>
        </p>
        `;

        counter++;
        listingsList.innerHTML += tempString;

        //this has to be in the forEach block for some reason
        let photos = document.querySelectorAll("img");
        photos.forEach(photo =>{
            photo.style.width = "600px";
            photo.style.backgroundColor = "skyblue";
            photo.style.objectFit = "contain";
        });
    });
}


/*
//DO NOT USE; DOES NOT WORK
async function loadListings2(){
    
    try{
        await fetch("http://localhost:3000/api-listings/search")
        .then( async res => {
            listingsArr = await res.json(); //promise results can't be printed directly?
            console.log(listingsArr);
        })
        .catch( err => {console.log("Error! " + err)} );
    }
    catch(err){
        console.log(err);
    }

    let listingsList = document.getElementById("listingsList");
    let counter = 1;
    let tempBuff = "";
    let tempFile = "";
    let tempPic = "";
    let tempURL = "";
    let tempString = "";

    listingsArr.forEach(async listing => {

        tempBuff = listing.pictures.data.data;
        tempFile = new Blob(tempBuff, {type: "image/png"});
        tempPic = new File(tempFile,"temp1.png");
        tempURL = URL.createObjectURL(tempPic);

        tempString = `<h1>Listing #${counter}</h1>
        <p>
            Listing ID: ${listing._id}
            <br>
            Owner: ${listing.owner}
            <br>
            Address: ${listing.address}
            <br>
            Price: ${listing.price}
            <br>
            Type: ${listing.type}
            <br>
            <img src="${tempURL}" alt="an image goes here">
            <br><br>
        </p>
        `;

        counter++;
        listingsList.innerHTML += tempString;
        
        let photos = document.querySelectorAll("img");
        photos.forEach(photo =>{
            photo.style.width = "600px";
            photo.style.backgroundColor = "skyblue";
            photo.style.objectFit = "contain";
        });

    });
}
*/

function setup(){

    //document.getElementById("listingsList").innerHTML = "asdf";
    loadListings();

    /*
    //this doesn't work here; has to be put at the end of async function loadListings
    //DO NOT USE THIS ONE
    let photos = document.querySelectorAll("img");
        photos.forEach(photo =>{
            photo.style.width = "600px";
            photo.style.backgroundColor = "skyblue";
            photo.style.objectFit = "contain";
        });
    */
}

window.addEventListener('load', setup);