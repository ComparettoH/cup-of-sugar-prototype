import React from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import TurnSlightLeftIcon from '@mui/icons-material/TurnSlightLeft';
import TurnSlightRightIcon from '@mui/icons-material/TurnSlightRight';

export function BottomNavBar({value, setValue}) {
    
    return <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}>
            <BottomNavigationAction
                label='Request'
                icon={<TurnSlightLeftIcon />}
                component={Link} to='/requestform'
            />

            <BottomNavigationAction 
                label='Activity' 
                icon={<ThreeSixtyIcon />} 
                component={Link} to='' 
            />

            <BottomNavigationAction 
                label='Offer' 
                icon={<TurnSlightRightIcon />} 
                component={Link} to='/offerform1' 
            />

        </BottomNavigation>
    </Paper>
};
