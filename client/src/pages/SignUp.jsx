import React, { useState } from 'react';

/*
//Arib's original version for reference
const SignUp = () => {

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
    console.log(formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <div className="pt-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type='text' placeholder='Username' className='border p-3 rounded-lg' id="username"  onChange={handleChange}/>
        <input type='text' placeholder='E-mail' className='border p-3 rounded-lg' id="email" onChange={handleChange}/>
        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id="password" onChange={handleChange}/>

        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Sign Up</button>
      </form>
      <div className="flex gap-2 m-5">
        <p>Have an account?</p>
        <span className="text-blue-700">Sign in</span>
      </div>
    </div>
  )
}
  */

//Version with Jethro's edits
const SignUp = () => {

  /*
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
    console.log(formData)
  }
    */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("userPassword").value;
    const name = document.getElementById("userName").value;
    const phone = document.getElementById("userPhone").value;

    const outObj = {
        email, password, name, phone
    };
    await fetch("https://homehaven-ssxz.onrender.com/api-users/create",
      {
          method: "POST",
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
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input type='text' placeholder='E-mail' className='border p-3 rounded-lg' id="userEmail" />
        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id="userPassword" />
        <input type='text' placeholder='Name' className='border p-3 rounded-lg' id="userName" />
        <input type='text' placeholder='Phone' className='border p-3 rounded-lg' id="userPhone" />

        <button onClick={handleSubmit} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Sign Up</button>
      </form>
      <div className="flex gap-2 m-5">
        <p>Have an account?</p>
        <span className="text-blue-700">Sign in</span>
      </div>
    </div>
  )
}

export default SignUp
