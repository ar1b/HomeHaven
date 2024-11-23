function updateToken(){
    let token = document.getElementById("token");
    let cookieString = "token=" + token.value;
    document.cookie = cookieString;
    document.getElementById("verifyCookie").innerHTML = cookieString;
    console.log(cookieString);
}

/*
async function submitForm(e){
    //make one fetch for the text type items
    //make another fetch for the file

    e.preventDefault();
    const price = document.getElementById("price").value;
    const address = document.getElementById("address").value;
    const type = document.getElementById("type").value;
    const pictures = document.getElementById("pictures").files[0];
    //const sendObj = {price, address, type, pictures};
    const sendObj = {price, address, type};
    console.log(sendObj);
    let newId;
    await fetch("http://localhost:3000/api-listings/create2",
        {
            method: "POST",
            body: JSON.stringify(sendObj),
            headers: {"Content-Type": "application/json"},
        })
        .then( res => { 
            const obj = res.json();
            newId = obj.id;
            console.log(obj) 
        })
        .catch( err => {console.log("Error! " + err)} );
    await fetch("http://localhost:3000/api-listings/create-photo",
        {
            method: "POST",
            body: pictures,
            headers: {"listing_id": newId}
        })
        .then( res => { 
            console.log(res.json);
        })
        .catch( err => {console.log("Error!! " + err)} );
}*/

async function submitForm2(e){
    e.preventDefault();
    const formData = new FormData(document.getElementById("form1"), document.getElementById("submit"))
    /*
    const price = document.getElementById("price").value;
    const address = document.getElementById("address").value;
    const type = document.getElementById("type").value;
    const pictures = document.getElementById("pictures").files[0];
    const sendObj = {price, address, type, pictures};
    */
    await fetch("http://localhost:3000/api-listings/create3",
        {
            method: "POST",
            body: formData
        })
        .then( res => {
            const obj = res.json(); //promise results can't be printed directly?
            console.log(obj);
        })
        .catch( err => {console.log("Error! " + err)} );
};


function setup(){
    document.getElementById("token").addEventListener('input', updateToken);
   //document.getElementById("submit").addEventListener('click',submitForm);
   document.getElementById("submit").addEventListener('click',submitForm2);
}

window.addEventListener('load', setup);