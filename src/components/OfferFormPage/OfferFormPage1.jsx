import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Button from '@mui/material/Button';

function OfferFormPage1(){

    const [itemHeadline, setItemHeadline] = useState('')
    const history = useHistory();

    const handleOfferFormPage2 = () => {
        history.push(`/offerform2`)
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
                    onChange={(event)=> setItemHeadline}
                    sx={{ width: '100%' }}
                    />
                </label>
            </div>
            <div>
                <h6>Upload an Image here:</h6>
            </div>

        </form>
        <div>
        <Button variant="outlined" onClick={() => handleOfferFormPage2()}>Next</Button>
        </div>
        </>
    )
}

export default OfferFormPage1;