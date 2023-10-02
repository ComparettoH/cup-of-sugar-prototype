import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useState } from 'react'
import UndoIcon from '@mui/icons-material/Undo';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import RedoIcon from '@mui/icons-material/Redo';


function Nav() {
  const user = useSelector((store) => store.user);
  const [value, setValue] = useState(0)

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
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

            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={5}>
              <BottomNavigation 
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}>
                <BottomNavigationAction label='Request' icon={<UndoIcon />} component={Link} to='' />
                <BottomNavigationAction label='Activity' icon={<ThreeSixtyIcon />} component={Link} to='' />
                <BottomNavigationAction label='Offer' icon={<RedoIcon />} component={Link} to='' />

              </BottomNavigation>
            </Paper>
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
