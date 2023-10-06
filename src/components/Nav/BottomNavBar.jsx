import React from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import requestIcon from '../../Icons/cupOfSugarSquiggleArrowDL.png';
import offerIcon from '../../Icons/cupOfSugarSquiggleArrow.png';
import activityIcon from '../../Icons/cupOfSugarCircleArrow.png'

export function BottomNavBar({value, setValue}) {
    
    return <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
            showLabels
            value={value}
            sx={{height: 80, width: '100%', position: 'fixed', bottom: 0, backgroundColor: 'secondary.light', zIndex:2,}}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}>
            <BottomNavigationAction
                label='Request'
                icon={<img style={{ width: '50px', height: '50px' }} src={requestIcon} alt="Request" />}
                component={Link} to='/requestform'
            />

            <BottomNavigationAction 
                label='Activity' 
                icon={<img style={{ width: '50px', height: '50px' }} src={activityIcon} alt="Activities" />} 
                component={Link} to='/activity' 
            />

            <BottomNavigationAction 
                label='Offer' 
                icon={<img style={{ width: '50px', height: '50px' }}  src={offerIcon} alt="Offer" />} 
                component={Link} to='/offerform1' 
            />

        </BottomNavigation>
    </Paper>
};
