import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import OfferCardContent from '../OfferCardContent/OfferCardContent';
import RequestCardContent from '../RequestCardContent/RequestCardContent';
// material ui imports
import { CardActionArea, Card, Grid, Box } from '@mui/material';

import ActivityCardContent from '../ActivityCardContent/ActivityCardContent';
// material ui imports
import { Switch, Card, Grid, Box, Typography, List, ListItem, IconButton, ListItemText, FormGroup, FormControlLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// displays user activity and all offers, requests, and shares
function ActivityFeed(props) {
    const dispatch = useDispatch();
    const offers = useSelector((store) => store.offers);
    const requests = useSelector((store) => store.requests);
    const user = useSelector((store) => store.user)


    // states for the toggle switches to change what is being shown in the activity lists
    const [activityView, setActivityView] = useState({
        offers: true,
        requests: true,
        shares: true,
    });


    //   gets activity information for current user's group
    useEffect(() => {
        dispatch({ type: 'FETCH_OFFERS' });
        dispatch({ type: 'FETCH_REQUESTS' });
    }, []);


    return (
        <>
            <Grid container spacing={2}>
                {/* maps over offers and builds cards for each one */}
                {offers.map((offer, index) => {
                    console.log('offer.user_id', user.id)
                    console.log('req.user.id', user.id)
                    // const video = cld.video(phrase.public_id).resize(fill().width(400).height(250));
                    if (user.id === offer.user_id) {
                        if (!offer.claimed_on) {
                            return (
                                <Grid item key={index} xs={12} sm={6} md={4} >

                                    <Card sx={{ width: '100%', }}>
                                        <CardActionArea onClick={() => { }} sx={{}}>
                                            {/* <AdvancedVideo cldVid={video} controls /> */}
                                            <OfferCardContent offer={offer} />
                                        </CardActionArea>
                                        {/* <PhraseCardActions phrase={phrase} /> */}
                                    </Card>
                                </Grid>
                            );
                        } else {
                            return (
                                <Grid>
                                    {offer.claimed_on} {offer.claimed_by}
                                </Grid>
                            );
                        }
                    }
                })
                }
                {/* maps over requests and builds cards for each one */}
                {requests.map((request, index) => {
                    // console.log('phrase.public_id', phrase.public_id)
                    // const video = cld.video(phrase.public_id).resize(fill().width(400).height(250));
                    if (user.id === request.user_id) {
                        if (!request.claimed_on) {
                            return (
                                <Grid item key={index} xs={12} sm={6} md={4} >

                                    <Card sx={{ width: '100%', }}>
                                        <CardActionArea onClick={() => { }} sx={{}}>
                                            {/* <AdvancedVideo cldVid={video} controls /> */}
                                            <RequestCardContent request={request} />
                                        </CardActionArea>
                                        {/* <PhraseCardActions phrase={phrase} /> */}
                                    </Card>
                                </Grid>
                            );
                        } else {
                            return (
                                <Grid>
                                    {request.fulfilled_on} {request.fulfilled_on}
                                </Grid>
                            );
                        }
                    }
                })
                }
            </Grid>

            {/* // declare and assign an array of all the offers and requests, and then sorts them by created date */}
            const offersAndRequests = offers.concat(requests);
    offersAndRequests.sort((a, b) => {
        return new Date(a.offered_on || a.requested_on) - new Date(b.offered_on || b.requested_on);
    });

            {/* //   sets toggle switch state */}
    const handleViewChange = (event) => {
                setActivityView({
                    ...activityView,
                    [event.target.name]: event.target.checked,
                });
    };

            return (
            <Box sx={{ width: '95%', margin: 'auto' }}>
                <FormGroup row>
                    <FormControlLabel
                        control={<Switch
                            checked={activityView.requests}
                            onChange={handleViewChange}
                            name="requests" />}
                        label="Requests" />
                    <FormControlLabel
                        control={<Switch
                            checked={activityView.shares}
                            onChange={handleViewChange}
                            name="shares" />}
                        label="Shares" />
                    <FormControlLabel
                        control={<Switch
                            checked={activityView.offers}
                            onChange={handleViewChange}
                            name="offers" />}
                        label="Offers" />
                </FormGroup>
                <Box sx={{ width: '95%', margin: 'auto' }}>
                    <Typography>
                        My Activity
                    </Typography>
                    {/* Creates a list of user's offers and requests in order of when they created them */}
                    <List dense>
                        {offersAndRequests.map((activity, index) => {
                            if (user.id === activity.user_id) {
                                return activity.claimed_on || activity.fulfilled_on ?
                                    (
                                        <ListItem
                                            key={index}
                                        >
                                            <ListItemText
                                                primary={`You shared ${activity.item_name} 
                                                        with ${activity.claimed_by_user ? activity.claimed_by_user : activity.fulfilled_by_user} 
                                                        on ${activity.claimed_on ? activity.claimed_on : activity.fulfilled_on}`}
                                                secondary={`Offer is set to expire on ${activity.expires_on}`}
                                            />
                                        </ListItem>
                                    )
                                    :
                                    (
                                        <ListItem
                                            key={index}
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete">
                                                    <EditIcon />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemText
                                                primary={`You ${activity.offered_on ? 'offered' : 'requested'} ${activity.item_name} 
                                                        on ${activity.offered_on || activity.requested_on}`}
                                                secondary={`Offer is set to expire on ${activity.expires_on}`}
                                            />
                                        </ListItem>
                                    )


                            }



                        }
                        )
                        }
                    </List>
                </Box>
                <Typography>
                    All Activity
                </Typography>
                <Grid container spacing={2} >
                    {/* maps over offers and builds cards for each one */}
                    {offersAndRequests.map((activity, index) => {
                        // const video = cld.video(phrase.public_id).resize(fill().width(400).height(250));
                        // if (user.id !== activity.user_id) {

                        return (
                            <Grid item key={index} xs={6} sm={6} md={6} >

                                <Card sx={{ width: '100%' }} >
                                    <ActivityCardContent
                                        activity={activity}
                                        activityView={activityView}
                                    />
                                </Card>
                            </Grid>
                        );
                        // } 
                    })
                    }
                </Grid>
            </Box>

        </>);
}

export default ActivityFeed;