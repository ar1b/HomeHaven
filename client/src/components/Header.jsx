import React from 'react';
import Logo from '../assets/hhlogo.png';
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl'>
            <Link to="/">
                <img
                    src={Logo}
                    className="h-36 w-auto max-h-20 object-contain"
                    alt="Home Haven Logo"
                />
            </Link>
            <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input 
                    type="text" 
                    placeholder="Search.." 
                    className='bg-transparent focus:outline-none'
                />
                <FaSearch className='text-slate-600' /> 
            </form>
            <ul className='flex gap-4'>
                <Link to="/"><li className=' text-slate-700 hover:underline'>Home</li></Link>
                <Link to="/about"><li className=' text-slate-700 hover:underline'>About</li></Link>
                <Link to="/sign-in"><li className=' text-slate-700 hover:underline'>Sign In</li></Link>
            </ul>
        </div>
    </header>
  )
}

export default Header
