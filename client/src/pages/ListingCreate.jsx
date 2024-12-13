import React, { useState } from 'react';

const ListingCreate = () => {

    async function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(document.getElementById("form1"), document.getElementById("submitBtn"))
        /*
        const price = document.getElementById("price").value;
        const address = document.getElementById("address").value;
        const type = document.getElementById("type").value;
        const pictures = document.getElementById("pictures").files[0];
        const sendObj = {price, address, type, pictures};
        */
        await fetch("https://comp229-backenddeploy.onrender.com/api-listings/create3",
            {
                method: "POST",
                body: formData
            })
            .then( async res => {
                const obj = await res.json(); //promise results can't be printed directly?
                console.log(obj);
            })
            .catch( err => {console.log("Error! " + err)} );
    };
  
    return (
      <div className="pt-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Create Listing</h1>
        <form id="form1" className="flex flex-col gap-4">
          <input type='text' placeholder='Address' className='border p-3 rounded-lg' id="address" name="address" />
          <input type='text' placeholder='Price' className='border p-3 rounded-lg' id="price" name="price" />
          <input type='text' placeholder='Type' className='border p-3 rounded-lg' id="type" name="type" />
          <br/>
          <label htmlFor="listingPicturs">Picture Upload</label>
          <input type='file' className='border p-3 rounded-lg' id="pictures" name="pictures"/>
  
          <button onClick={handleSubmit} id="submitBtn" className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Upload</button>
        </form>
        <div className="flex gap-2 m-5">
        </div>
      </div>
    )
  }

  export default ListingCreate;