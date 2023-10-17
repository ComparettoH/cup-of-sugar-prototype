import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useReduxStore from '../../hooks/useReduxStore';
import { useHistory } from "react-router-dom";
import ActivityCompleteModal from "../ActivityCompleteModal/ActivityCompleteModal";
import { DateTimeFormatter } from "../../utils/DateTimeFormatter/DateTimeFormatter";
// material ui imports
import { styled } from '@mui/material/styles';
import { Paper } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Unstable_Grid2";
import Stack from '@mui/material/Stack';

function OfferItemPage() {

    const history = useHistory();
    const store = useReduxStore();
    const profile = useSelector((store) => store.profile);
    const activity = useSelector((store) => store.activityItem)

    // const Item = styled(Paper)(({ theme }) => ({
    //     // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#',
    //     // ...theme.typography.body2,
    //     padding: theme.spacing(1),
    //     textAlign: 'center',
    //     alignContent: 'center',
    //     color: theme.palette.text.secondary,
    // }));

    return (
        <Box>
            <Stack direction="column" spacing={2} >
            <section className='offer-item'>
                <Grid container spacing={2} sx={{ mx: '1rem' }}>                   
                    <Grid xs={12} mt={2} display="flex" justifyContent="center" alignItems="center">
                        <Typography variant="h6">{activity.name} would like to share</Typography>
                    </Grid>

                    <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                        <Typography variant="h4">{activity.item_name}</Typography>
                    </Grid>
                    <Grid align="center" >
                        <img src={activity.imgpath} sx={{width: '300px', height: '300px'}} />
                    </Grid>
                    <Grid xs={12}>
                        <Typography variant="subtitle1">{activity.description}</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Typography variant="h6">This offer expires on: {DateTimeFormatter(activity.expires_on)}</Typography>
                    </Grid>
                </Grid>

            </section>
            <footer>
                <ActivityCompleteModal offer={activity} />
            </footer>
            </Stack>
        </Box>
        
    )
}

export default OfferItemPage;