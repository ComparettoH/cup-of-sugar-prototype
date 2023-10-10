import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useReduxStore from '../../hooks/useReduxStore';
import { useHistory } from "react-router-dom";
// material ui imports
import { styled } from '@mui/material/styles';
import { Paper } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Unstable_Grid2";

function OfferItemPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const store = useReduxStore();
    const profile = useSelector((store) => store.profile);
    const activity = useSelector((store) => store.activityItem)

    useEffect(() => {
        dispatch({ type: 'FETCH_OFFER_ITEM' });
    }, [dispatch]);

    const Item = styled(Paper)(({ theme }) => ({
        // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        // ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Box>
            <header>

            </header>
            <section className='request-item'>
                <Grid container spacing={1}>
                    <Grid xs={12}>
                        <Item>
                            <Typography variant="h5">{activity.name}</Typography>
                        </Item>
                    </Grid>
                    <Grid xs={12}>
                        <Item>
                            <Typography variant="h7">Would like to share </Typography>
                        </Item>
                    </Grid>
                    <Grid xs={12}>
                        <Item>
                            <Typography variant="h6">{activity.item_name}</Typography>
                        </Item>
                    </Grid>
                    <Grid xs={12}>
                        <Item>
                            <Typography variant="subtitle1">{activity.description}</Typography>
                        </Item>
                    </Grid>
                    <Grid xs={12}>
                        <Item>
                            <Typography variant="h6">This request expires on: {activity.expires_on}</Typography>
                        </Item>
                    </Grid>
                </Grid>
            </section>
            <footer>
                <Button id="submit" variant="contained">Fulfill</Button>
            </footer>
        </Box>
    )
}

export default OfferItemPage;