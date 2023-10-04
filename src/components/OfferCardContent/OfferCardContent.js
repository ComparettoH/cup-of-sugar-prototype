// Material UI imports
import { CardContent, Typography } from '@mui/material';

function OfferCardContent({ offer }) {

    return (

        <CardContent sx={{ bgcolor: 'info.main' }}>
            <Typography gutterBottom variant="h5" color='secondary.light'>
                Offer
            </Typography>
            <Typography variant="body2" color="secondary.light">
                {offer.item_name}
            </Typography>
        </CardContent>

    );
}

export default OfferCardContent