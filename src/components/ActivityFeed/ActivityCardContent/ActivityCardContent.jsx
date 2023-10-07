import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DateTimeFormatter, DateFormatter } from '../../../utils/DateTimeFormatter/DateTimeFormatter';
// Material UI imports
import { CardContent, CardActionArea, Typography } from '@mui/material';

function OfferCardContent({ activity, activityView }) {
    const history = useHistory();
    const dispatch = useDispatch();
    // console.log('offered on', activity.offered_on);
    // console.log('offersChecked', activityView);

    // navigates to clicked activity info page for clicked card
    const handleActivityNav = () => {
        dispatch({ type: "SET_CURRENT_ACTIVITY", payload: activity })
        if (activity.offered_on && !activity.claimed_on) {
            history.push('./offeritem')
        } else if (activity.requested_on && !activity.fulfilled_on) {
            history.push('./requestitem')
        }
    }

    return (

        <CardActionArea onClick={() => handleActivityNav()} sx={{}}>
            {/* /* checks if the activity has been completed, if so displays a share card */}
            {activityView.shares && (activity.claimed_on || activity.fulfilled_on) ?
                <CardContent sx={{ bgcolor: 'warning.light' }}>
                    <Typography gutterBottom variant="button" color='info.main'>
                        Share
                    </Typography>
                    <Typography variant="body1" color="info.main">
                        {`${activity.name} 
                    shared ${activity.item_name} 
                    with ${activity.claimed_by_user ? activity.claimed_by_user : activity.fulfilled_by_user} 
                    on ${activity.claimed_on ? DateFormatter(activity.claimed_on) : DateFormatter(activity.fulfilled_on)}`}
                    </Typography>
                </CardContent>
                :
                /* <AdvancedVideo cldVid={video} controls /> */
                // checks to see if offer and/or activity toggles are checked, and if so if the current activity matches the checked switch. 
                ((activity.requested_on && activityView.requests)
                    ||
                    (activity.offered_on && activityView.offers))
                &&
                /* creates card content with conditional logic for request or offer  */
                <CardContent sx={{ bgcolor: activity.offered_on ? 'primary.light' : 'primary.main' }}>
                    <Typography gutterBottom variant="button" color='info.main'>
                        {activity.offered_on ? 'offer' : 'request'}
                    </Typography>
                    <Typography variant="body1" color="info.main">
                        {`${activity.name} ${activity.offered_on ? 'offer' : 'request'}ed 
                    ${activity.item_name} on ${activity.offered_on ? DateTimeFormatter(activity.offered_on) : DateTimeFormatter(activity.requested_on)}`}
                    </Typography>
                </CardContent>
                /* <PhraseCardActions phrase={phrase} /> */
            }
        </CardActionArea>

    );
}

export default OfferCardContent