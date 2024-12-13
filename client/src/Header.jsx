import {Link} from 'react-router-dom';

import Logo from './assets/hhlogo.png';

//<Link to=''><img src=''/></Link>
//<Link to=''>Left1</Link>

export default function Header(){
    return (
        <nav className='flex items-center justify-between px-6 py-1 bg-white rounded-full shadow-md max-w-lg mx-auto my-4 w-[95%] max-w-full'>
            <div className='flex items-center'>
                <Link to='/'><img className='h-20 w-auto' src={Logo}/></Link>
            </div>
                
            <div className="flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
                <Link className='text-gray-700 hover:text-gray-900 transition-colors' to='/'>Home</Link>
                <Link className='text-gray-700 hover:text-gray-900 transition-colors' to='/About'>About</Link>
                <Link className='text-gray-700 hover:text-gray-900 transition-colors' to='/listingsearch'>Listings</Link>
                <Link className='text-gray-700 hover:text-gray-900 transition-colors' to='/listingcreate'>Create Listing</Link>
                <Link className='text-gray-700 hover:text-gray-900 transition-colors' to='userupdate'>Profile</Link>
            </div>
                
                    
            <div className="flex space-x-4 items-center">
                <Link className='text-gray-700 hover:text-gray-900 transition-colors' to='signup'>Sign Up</Link>
                <Link className='bg-yellow-400 text-gray-800 px-4 py-2 rounded-full hover:bg-yellow-500 transition-colors' to='signin'>Sign In</Link>
            </div>
                
        </nav>
    );
}