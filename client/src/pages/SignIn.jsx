import React, { useState } from 'react';

const SignIn = () => {
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const email = document.getElementById("userEmail").value;
      const password = document.getElementById("userPassword").value;
  
      const outObj = {
          email, password
      };
      await fetch("/api-users/login",
        {
            method: "POST",
            body: JSON.stringify(outObj),
            headers: {"Content-Type": "application/json"},
        })
        .then( res => { 
            const obj = res.json();
            console.log(obj);
        })
        .catch( err => {console.log("Error! " + err)} );
    }
  
    return (
      <div className="pt-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form className="flex flex-col gap-4">
          <input type='text' placeholder='E-mail' className='border p-3 rounded-lg' id="userEmail" />
          <input type='password' placeholder='Password' className='border p-3 rounded-lg' id="userPassword" />
  
          <button onClick={handleSubmit} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Sign Up</button>
        </form>
        <div className="flex gap-2 m-5">
          <p>Don't have an account?</p>
          <span className="text-blue-700">Sign Up</span>
        </div>
      </div>
    )
  }
  
  export default SignIn