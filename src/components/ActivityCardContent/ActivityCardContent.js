// Material UI imports
import { CardContent, CardActionArea, Typography } from '@mui/material';

function OfferCardContent({ activity }) {

    return (

        <CardActionArea onClick={() => { }} sx={{}}>
            {/* <AdvancedVideo cldVid={video} controls /> */}
            <CardContent sx={{ bgcolor: 'primary.light' }}>
                <Typography gutterBottom variant="button" color='info.main'>
                {activity.offered_on ? 'offer' : 'request'}
                </Typography>
                <Typography variant="body1" color="info.main">
                    {`${activity.name} ${activity.offered_on ? 'offer' : 'request'}ed 
                    ${activity.item_name} on ${activity.offered_on ? activity.offered_on : activity.requested_on}`}
                </Typography>
            </CardContent>
            {/* <PhraseCardActions phrase={phrase} /> */}
        </CardActionArea>
    );
}

export default OfferCardContent