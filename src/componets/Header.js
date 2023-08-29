import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'
import { AuthContext } from './LoginContext';
import { useContext } from 'react';
import UserProfile from './profilemenu';
const Header = () => {
    const {user, isAuthenticated,Logout } = useContext(AuthContext);
    let portal = "User Panel"
    if (window.location.host.split(".")[0] === "admin") {
      portal = "Admin Panel"
    }
  return (
    <header style={{marginBottom:"20px"}}>
        <div className='log_div'>
        
        <h3>{portal}</h3>
        
      
      </div> 
      <div className='main_nav'>
      <nav>
      {isAuthenticated ? (
      <div className="profile-menu">
        <UserProfile user={user} Logout={Logout} />
      </div>
       ) :(
        <div className='log_btn'>
        <Link to="/Login" className='button-link'>Login/Singup</Link>
        </div>
       )

      }
      </nav>
      </div>
    </header>
  );
};

export default Header;
