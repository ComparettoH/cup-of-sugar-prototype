// Material UI imports
import { CardContent, CardActionArea, Typography } from '@mui/material';

function OfferCardContent({ activity }) {

    return (

        <CardActionArea onClick={() => { }} sx={{}}>
            {/* /* checks if the activity has been completed, if so displays a share card */ }
            {activity.claimed_on || activity.fulfilled_on ?
                <CardContent sx={{ bgcolor: 'warning.light' }}>
                    <Typography gutterBottom variant="button" color='info.main'>
                        Share
                    </Typography>
                    <Typography variant="body1" color="info.main">
                        {`${activity.name} 
                    shared ${activity.item_name} 
                    with ${activity.claimed_by_user ? activity.claimed_by_user : activity.fulfilled_by_user} 
                    on ${activity.claimed_on ? activity.claimed_on : activity.fulfilled_on}`}
                    </Typography>
                </CardContent>
                :
                /* <AdvancedVideo cldVid={video} controls /> */
                /* creates card content with conditional logic for request or offer */
                <CardContent sx={{ bgcolor: activity.offered_on ? 'primary.light' : 'primary.main' }}>
                    <Typography gutterBottom variant="button" color='info.main'>
                        {activity.offered_on ? 'offer' : 'request'}
                    </Typography>
                    <Typography variant="body1" color="info.main">
                        {`${activity.name} ${activity.offered_on ? 'offer' : 'request'}ed 
                    ${activity.item_name} on ${activity.offered_on ? activity.offered_on : activity.requested_on}`}
                    </Typography>
                </CardContent>
                /* <PhraseCardActions phrase={phrase} /> */
            }
        </CardActionArea>

    );
}

export default OfferCardContent