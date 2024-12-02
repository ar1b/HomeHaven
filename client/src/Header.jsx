import './Header.css';
import {Link} from 'react-router-dom';

//<Link to=''><img src=''/></Link>
//<Link to=''>Left1</Link>

export default function Header(){
    return (
        <div id="headerBox">
            <div id="headerLeft">
                <div id="logo">
                    LOGO
                    
                </div>
                <div className="divMinor">
                    Search Listings
                    
                </div>
                <div className="divMinor">
                    Create Listing
                </div>
            </div>
            <div id="headerRight">
                <div className="divMinor">
                    Sign In 
                </div>
                <div className="divMinor">
                    Sign Up
                </div>
                <div className="divMinor">
                    Log Out
                </div>
            </div>
        </div>
    );
}