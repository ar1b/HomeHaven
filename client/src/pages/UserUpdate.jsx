import React, { useState } from 'react';

const UserUpdate = () => {
  
    const handleSubmit = async (e) => {
      e.preventDefault();
        const email = document.getElementById("userEmail").value;
        const password = document.getElementById("userPassword").value;
        const name = document.getElementById("userName").value;
        const phone = document.getElementById("userPhone").value;

        const outObj = {
            email, password, name, phone
        };
        await fetch("https://homehaven-ssxz.onrender.com/api-users/update",
            {
                method: "PATCH",
                body: JSON.stringify(outObj),
                headers: {"Content-Type": "application/json"},
            })
            .then( async res => { 
                const obj = await res.json();
                console.log(obj);
            })
            .catch( err => {console.log("Error! " + err)} );
    }
  
    return (
      <div className="pt-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Update User Info</h1>
        <p>Leave field blank to leave it unchanged</p>
        <form className="flex flex-col gap-4">
        <input type='text' placeholder='E-mail' className='border p-3 rounded-lg' id="userEmail" />
        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id="userPassword" />
        <input type='text' placeholder='Name' className='border p-3 rounded-lg' id="userName" />
        <input type='text' placeholder='Phone' className='border p-3 rounded-lg' id="userPhone" />
  
          <button onClick={handleSubmit} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Sign Up</button>
        </form>
        <div className="flex gap-2 m-5">
          
        </div>
      </div>
    )
  }
  
  export default UserUpdate