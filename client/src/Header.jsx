import './Header.css';
import {Link} from 'react-router-dom';

import Logo from './logo.jpeg';

//<Link to=''><img src=''/></Link>
//<Link to=''>Left1</Link>

export default function Header(){
    return (
        <div id="headerBox">
            <div id="headerLeft">
                <div id="logo">
                    <Link to='/'><img src={Logo}/></Link>
                </div>
                <div className="divMinor">
                <Link to='/listingsearch'>Search Listings</Link>
                    
                </div>
                <div className="divMinor">
                    <Link to='/listingcreate'>Create Listing</Link>
                </div>
            </div>
            <div id="headerRight">
                <div className="divMinor">
                    <Link to='signup'>Sign Up</Link>
                </div>
                <div className="divMinor">
                    <Link to='signin'>Sign In</Link>
                </div>
                <div className="divMinor">
                    <Link to='userupdate'>Upadte User</Link>
                </div>
                <div className="divMinor">
                    Log Out
                </div>
            </div>
        </div>
    );
}