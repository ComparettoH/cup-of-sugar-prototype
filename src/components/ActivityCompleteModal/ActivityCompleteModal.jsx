
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '@mui/material/Modal';
import { Button, Box, Typography, Stack, Divider } from '@mui/material';



export default function ActivityCompleteModal({ offer, request }) {
    const dispatch = useDispatch();
    // changes state for the modal operation
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // claims or fulfills the activity and navigates back to activity feed
    const completeActivity = () => {
        // checks to see if it is an offer or request and dispatches accordingly
        offer ? 
        dispatch({
            type: 'CLAIM_OFFER',
            payload: offer.id
        })
        :
        dispatch({
            type: 'FULFILL_REQUEST',
            payload: request.id
        })

        history.push('/activity')
    }

    // style the modal
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        bgcolor: 'secondary.main',
        border: 'info.main',
        borderWidth: 1,
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Button
                onClick={handleOpen}
                size="small"
                variant='outlined'
                color="error"
            >
                {offer ? 'Claim' : 'Fulfill'}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="complete activiy modal"
                aria-describedby="modal to give more info when you fulfill or claim an activity"
            >
                <Box sx={style}>
                    <Typography id="modal-delete-activity" color='info.main'>
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="space-around"
                        alignItems="center"
                        divider={<Divider orientation="vertical" flexItem />}
                        sx={{mt: 3}}
                        >

                        <Button
                            onClick={() => completeActivity()}
                            size="small"
                            variant='contained'
                            color="error"
                        >
                            Yes, delete
                        </Button>
                        <Button
                            onClick={handleClose}
                            size="small"
                            variant='contained'
                            color="primary"
                        >
                            No, save
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    )

}
