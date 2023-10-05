import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OfferCardContent from '../OfferCardContent/OfferCardContent';
import RequestCardContent from '../RequestCardContent/RequestCardContent';
// material ui imports
import { CardActionArea, Card, Grid, Box, Typography, List, ListItem, IconButton, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// displays user activity and all offers, requests, and shares
function ActivityFeed(props) {
    const dispatch = useDispatch();
    const offers = useSelector((store) => store.offers);
    const requests = useSelector((store) => store.requests);
    const user = useSelector((store) => store.user)

    //   gets activity information for current user's group
    useEffect(() => {
        dispatch({ type: 'FETCH_OFFERS' });
        dispatch({ type: 'FETCH_REQUESTS' });
    }, []);

    return (
        <Box sx={{ width: '95%', margin: 'auto' }}>
            <Typography>
                My Activity
            </Typography>
            <List dense>
                {offers.map((offer, index) => {
                    if (user.id === offer.user_id) {
                        return (

                            <ListItem
                                key={index}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={`You offered ${offer.item_name} on ${offer.offered_on}`}
                                    secondary={`Offer is set to expire on ${offer.expires_on}`}
                                />
                            </ListItem>
                        )
                    }
                }
                )}
            </List>
            <List dense>
                {requests.map((request, index) => {
                    if (user.id === request.user_id) {
                        return (

                            <ListItem
                                key={index}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={`You offered ${request.item_name} on ${request.requested_on}`}
                                    secondary={`Offer is set to expire on ${request.expires_on}`}
                                />
                            </ListItem>
                        )
                    }
                }
                )}
            </List>
            <Typography>
                Activity
            </Typography>
            <Grid container spacing={2}>
                {/* maps over offers and builds cards for each one */}
                {offers.map((offer, index) => {
                    console.log('offer.user_id', user.id)
                    console.log('req.user.id', user.id)
                    // const video = cld.video(phrase.public_id).resize(fill().width(400).height(250));
                    if (user.id !== offer.user_id) {
                        if (!offer.claimed_on) {
                            return (
                                <Grid item key={index} xs={6} sm={6} md={6} >

                                    <Card sx={{ width: '100%' }} >
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
                    if (user.id !== request.user_id) {
                        if (!request.claimed_on) {
                            return (
                                <Grid item key={index} xs={6} sm={6} md={6} >

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
        </Box>
    );
}

export default ActivityFeed;