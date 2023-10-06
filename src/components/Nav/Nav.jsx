import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { useState } from 'react'
import BottomNavBar from '../BottomNavBar/BottomNavBar';
import TopNavBar from '../TopNavBar/TopNavBar';
import zIndex from '@mui/material/styles/zIndex';


function Nav() {
  const user = useSelector((store) => store.user);
  const [value, setValue] = useState(0);

  return (

    <div className="nav">


      
      <div>
        {/* If no user is logged in, show these links
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )} */}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <TopNavBar />
            <div>

            </div>
            {/* <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <LogOutButton className="navLink" /> */}

            <BottomNavBar />
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;

