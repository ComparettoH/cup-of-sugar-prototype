import React, { useState } from 'react';
import { useSelector,  } from 'react-redux';
import { useHistory } from 'react-router-dom';
// material ui imports
import { Box, Typography, Stack, AppBar } from '@mui/material';
import { IconButton } from "@mui/material";
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
// custom icon imports
import CupIcon from '../../Icons/cupOfSugarIcon.png'


function TopNavBar() {
    const history = useHistory();
    const store = useSelector((store) => store);
    const [heading, setHeading] = useState('Functional Component');

    // navigates to the profile page
    const navProfile = () => {
        history.push('/profile')
    }

    return (
        <AppBar>
            <Stack direction='row' spacing={4} justifyContent="space-around" alignItems="center">
                <Typography variant='h7' gutterBottom mt={3}>
                    Cup of Sugar
                </Typography>
                <IconButton sx={{ width: 60 }}>
                    <img src={CupIcon} height={50} width={50} />
                </IconButton>
                <IconButton size='large' onClick={navProfile}>
                    <AccountCircleTwoToneIcon fontSize="inherit" />
                </IconButton>
            </Stack>
        </AppBar>
    );
}

export default TopNavBar;