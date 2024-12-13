import {Link} from 'react-router-dom';

import Logo from '../assets/hhlogo.png';

//<Link to=''><img src=''/></Link>
//<Link to=''>Left1</Link>

export default function Header(){
    return (
        <nav className='flex items-center justify-between px-6 py-1 bg-white rounded-full shadow-md  max-w-full mx-4 mt-2'>
            <div className='flex items-center space-x-4'>
                <Link to='/'><img className='h-20 w-auto' src={Logo}/></Link>
            </div>
                
            <div className="flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
                <Link className='text-gray-700 hover:text-gray-900 transition-colors px-2' to='/'>Home</Link>
                <Link className='text-gray-700 hover:text-gray-900 transition-colors px-2' to='/About'>About</Link>
                <Link className='text-gray-700 hover:text-gray-900 transition-colors px-2' to='/listingsearch'>Listings</Link>
                <Link className='text-gray-700 hover:text-gray-900 transition-colors px-2' to='/listingcreate'>Create Listing</Link>
                <Link className='text-gray-700 hover:text-gray-900 transition-colors px-2' to='userupdate'>Profile</Link>
            </div>
                
                    
            <div className="flex space-x-4 items-center">
                <Link className='text-gray-700 hover:text-gray-900 transition-colors' to='signup'>Sign Up</Link>
                <Link className='bg-yellow-400 text-gray-800 px-4 py-2 rounded-full hover:bg-yellow-500 transition-colors' to='signin'>Sign In</Link>
            </div>
                
        </nav>
    );
}