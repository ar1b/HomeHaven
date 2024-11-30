function updateToken(){
    let token = document.getElementById("token");
    let cookieString = "token=" + token.value;
    document.cookie = cookieString;
    document.getElementById("verifyCookie").innerHTML = cookieString;
    console.log(cookieString);
}

async function submitForm2(e){
    e.preventDefault();
    const formData = new FormData(document.getElementById("form1"), document.getElementById("submit"))
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
    document.getElementById("submit").addEventListener('click',submitForm2);
}

window.addEventListener('load', setup);