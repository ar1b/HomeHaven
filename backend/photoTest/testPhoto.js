let listingId = "";

function updateId(){
    listingId = document.getElementById("listingId").value;
    document.getElementById("verifyId").innerHTML = listingId;
    console.log(listingId);
}


async function submitForm(e){
    e.preventDefault();
    try{
        await fetch("http://localhost:3000/api-listings/listing2/" + listingId)
        .then( async res => {
            const obj = await res.blob();
            const tempURL = URL.createObjectURL(obj);
            document.getElementById("photoBox").src = tempURL;
            console.log(tempURL);
        })
        .catch( err => {console.log("Error! " + err)} );
    }
    catch(err){
        console.log(err);
    }
} 

function setup(){
    document.getElementById("listingId").addEventListener('input', updateId);
    document.getElementById("submit").addEventListener('click',submitForm);

    document.getElementById("photoBox").style.width = "600px";
    document.getElementById("photoBox").style.backgroundColor = "skyblue";
    document.getElementById("photoBox").style.objectFit = "contain";
}

window.addEventListener('load', setup);