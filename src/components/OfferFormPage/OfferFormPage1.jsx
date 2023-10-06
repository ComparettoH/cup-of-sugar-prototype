import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";

import Button from '@mui/material/Button';

function OfferFormPage1(){

    const [itemHeadline, setItemHeadline] = useState('')
    const dispatch = useDispatch();
    const history = useHistory();

    const handleOfferFormPage2 = () => {
        console.log('itemHeadline:', itemHeadline)
        // dispatch to offer reducer to store item headline 
        dispatch({ type: 'SET_OFFER_ITEM_NAME', payload: itemHeadline})
        // navigate to page 2 of offer form for this item
        history.push(`/offerform2/${itemHeadline}`)
    }

    return(
        <>
        <form className='formPanel'>
            <div>
                <label htmlFor='itemHeadline'>
                    Headline 
                    <input
                    type='text'
                    placeholder='What item are you sharing?'
                    value={itemHeadline}
                    onChange={(event)=> setItemHeadline(event.target.value)}
                    sx={{ width: '100%' }}
                    />
                </label>
            </div>
            <div>
                <h6>Upload an Image here:</h6>
            </div>

        
        <div>
        <Button variant="contained" onClick={() => handleOfferFormPage2({itemHeadline})}>Next</Button>
        </div>
        </form>
        </>
    )
}

export default OfferFormPage1;