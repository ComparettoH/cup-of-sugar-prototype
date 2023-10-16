import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TextField } from '@mui/material';
import { Button, Typography } from "@mui/material";
import Box from '@mui/material/Box';


function OfferFormPage1() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [offerImage, setOfferImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [itemHeadline, setItemHeadline] = useState('')

    const handleOfferFormPage2 = () => {
        console.log('itemHeadline:', itemHeadline)
        const itemNamePhoto = {
            itemHeadline,
            offerImage,
        }
        // dispatch to offer reducer to store item headline 
        dispatch({ type: 'CREATE_NEW_OFFER1', payload: itemNamePhoto })
        // navigate to page 2 of offer form for this item
        history.push(`/offerform2/${itemHeadline}`)
    }

    const offerImageUpload = (image) => {
        setOfferImage(image);
        setPreviewImage(URL.createObjectURL(image));
    }

    return (
        <>
            <Box
                component="form"
                justifyContent="center"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '35ch' },
                }}
            >
                <Typography variant='h6'  >
                    I would like to share:
                </Typography>
                <Typography>
                    Headline
                    <TextField
                        type='text'
                        placeholder='What item are you offering?'
                        value={itemHeadline}
                        onChange={(event) => setItemHeadline(event.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                </Typography>

                <Typography>
                    <h6>Upload an image here:</h6>
                    {previewImage &&
                        <img src={previewImage} />
                    }
                </Typography>
                <TextField
                    onChange={e => offerImageUpload(e.target.files[0])}
                    type="file"
                    accept="image/*"
                    variant='filled'

                />
                <div>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2, alignContent:"right" }}
                        onClick={() => handleOfferFormPage2({ itemHeadline })}>Next</Button>

                </div>
            </Box>
        </>
    )
}

export default OfferFormPage1;