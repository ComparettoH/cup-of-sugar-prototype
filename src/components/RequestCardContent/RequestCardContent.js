// Material UI imports
import { CardContent, Typography } from '@mui/material';

function RequestCardContent({ request }) {

    return (

        <CardContent sx={{ bgcolor: 'info.main' }}>
            <Typography gutterBottom variant="h5" color='secondary.light'>
                Offer
            </Typography>
            <Typography variant="body2" color="secondary.light">
                {request.item_name}
            </Typography>
        </CardContent>

    );
}

export default RequestCardContent