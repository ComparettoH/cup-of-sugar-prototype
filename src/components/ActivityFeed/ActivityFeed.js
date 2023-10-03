import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OfferCardContent from '../OfferCardContent/OfferCardContent';
import RequestCardContent from '../RequestCardContent/RequestCardContent';
// material ui imports
import { CardActionArea, Card, Grid } from '@mui/material';

// displays user activity and all offers, requests, and shares
function ActivityFeed(props) {
    const dispatch = useDispatch();
    const offers = useSelector((store) => store.offers);
    const requests = useSelector((store) => store.requests);

    //   gets activity information for current user's group
    useEffect(() => {
        dispatch({ type: 'FETCH_OFFERS' });
        dispatch({ type: 'FETCH_REQUESTS' });
    }, []);

    return (
        <Grid container spacing={2}>
            {/* maps over offers and builds cards for each one */}
            {offers.map((offer, index) => {
                // console.log('phrase.public_id', phrase.public_id)
                // const video = cld.video(phrase.public_id).resize(fill().width(400).height(250));
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
            }
            )}
             {/* maps over requests and builds cards for each one */}
            {requests.map((request, index) => {
                // console.log('phrase.public_id', phrase.public_id)
                // const video = cld.video(phrase.public_id).resize(fill().width(400).height(250));
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
            }
            )}
        </Grid>
    );
}

export default ActivityFeed;