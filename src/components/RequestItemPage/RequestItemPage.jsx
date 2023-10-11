import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useReduxStore from '../../hooks/useReduxStore';
import { useHistory } from "react-router-dom";
// material ui imports
// material ui imports
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

function RequestItemPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const store = useReduxStore();
    const profile = useSelector((store) => store.profile);
    const activity = useSelector((store) => store.activityItem)
    console.log('activity in request item:', activity)
    
    useEffect(() => {
        dispatch({ type: 'FETCH_REQUEST_ITEM' });
    }, [dispatch]);

    return (
        <>
        <Box>
            <header>

                </header>
                <section className='request-item'>
                    <div>
                        <Typography variant="h4">{profile[0]?.name}</Typography>

                        <Typography variant="h5">has requested: </Typography>
                    </div>
                    <div>

                    </div>
                    <div>
                        <h3>This request expires on: </h3>
                    </div>
                </section>
                <footer>
                    <Button variant="contained">Fulfill</Button>
                </footer>
            </Box>
        </>);
}

export default RequestItemPage;