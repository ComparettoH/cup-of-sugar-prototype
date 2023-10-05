// Material UI imports
import { CardContent, Typography } from '@mui/material';

function OfferCardContent({ offer }) {

    return (

        <CardContent sx={{ bgcolor: 'primary.light' }}>
            <Typography gutterBottom variant="button" color='info.main'>
                Offer
            </Typography>
            <Typography variant="body1" color="info.main">
                {offer.item_name}
            </Typography>
        </CardContent>

    );
}

export default OfferCardContent