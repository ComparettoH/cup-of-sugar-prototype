import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { useState } from 'react'
import { BottomNavBar, newFunction } from './BottomNavBar';
import TopNavBar from '../TopNavBar/TopNavBar';


function Nav() {
  const user = useSelector((store) => store.user);
  const [value, setValue] = useState(0);

  return (

    <div className="nav-top">
      <TopNavBar/>
      <Link to="/home">
        <h2 className="nav-title">Cup Of Sugar</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <LogOutButton className="navLink" />

            <BottomNavBar value={value} setValue={setValue} />
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;

