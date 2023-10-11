import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers';

import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';


import Button from '@mui/material/Button';

function OfferFormPage2() {
    const itemName = useSelector((store) => store.offers.itemHeadline)
    const imgpath = useSelector((store) => store.offers.offerImage)
    // console.log('itemName:', itemName)

    const dispatch = useDispatch();
    const history = useHistory();

    const [itemDescription, setItemDescription] = useState('')
    const [persihableItem, setPerishableItem] = useState(false)
    const [homemadeItem, setHomemadeItem] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [bestByDate, setBestByDate] = useState(null);
    const [offerExpiresDate, setOfferExpiresDate] = useState(null);

    // const handleBestByDate = (date) => {
    //     setBestByDate(date);
    // };

    // const handleOfferExpiresDate = (date) => {
    //     setOfferExpiresDate(date);
    // };

    const handleBackButton = () => {
        history.push(`/offerform1/${itemName}`)

    }

    const handleSubmitOffer = (event) => {
        event.preventDefault();

        let timestamp = new Date();
        let newOffer = {
            item_name: itemName,
            imgpath: imgpath,
            description: itemDescription,
            perishable: persihableItem,
            homemade: homemadeItem,
            category_type: selectedCategory,
            offered_on: timestamp,
            best_by: bestByDate,
            expires_on: offerExpiresDate
        }
        console.log('newoffer:', newOffer)
        // dispatch to offer saga
        dispatch({ type: 'ADD_OFFER', payload: newOffer })
        // navigate to activity feed
        // history.push('/activity')
    }

    return (
        <>
            <form onSubmit={handleSubmitOffer} className='formPanel'>
                <div>
                    <label htmlFor="itemDescription">
                        Description
                        <input

                            type='text'
                            placeholder="Provide some details about the item you'd like to share. 
                            You can add information about quantity, date of purchase, reason for sharing, etc."
                            value={itemDescription}
                            onChange={(event) => setItemDescription(event.target.value)}
                            sx={{ width: '100%' }}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Perishable
                        <Checkbox
                            checked={persihableItem}
                            onChange={(event) => setPerishableItem(event.target.value)}
                        />
                    </label>
                    <label>
                        Homemade Item
                        <Checkbox
                            checked={homemadeItem}
                            onChange={(event) => setHomemadeItem(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="categoryDropdown">
                        Item Category
                        <FormControl fullWidth={true}>
                            <Select
                                id="itemCategory"
                                value={selectedCategory}
                                onChange={(event) => setSelectedCategory(event.target.value)}
                                input={<OutlinedInput label="Select from categories:" />}
                            >
                                <MenuItem value="produce">Produce</MenuItem>
                                <MenuItem value="meatSeafood">Fresh Meat & Seafood</MenuItem>
                                <MenuItem value="dairyEggs">Dairy & Eggs</MenuItem>
                                <MenuItem value="frozenFoods">Frozen Foods</MenuItem>
                                <MenuItem value="prepFood">Prepared Food</MenuItem>
                                <MenuItem value="dryGoods">Dry Goods</MenuItem>
                                <MenuItem value="nonPerishables">Non-perishables</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </label>
                </div>
                <div>
                    <label htmlFor="calendar">
                        Best if used by
                        <MobileDatePicker
                            value={bestByDate}
                            onChange={(date) => setBestByDate(date)} />
                    </label>
                </div>
                <div>
                    <label htmlFor="calendar">
                        Claim by
                        <MobileDateTimePicker
                            value={offerExpiresDate}
                            onChange={(date) => setOfferExpiresDate(date)} />
                    </label>
                </div>

                <div>
                    <Button onClick={() => handleBackButton()} variant="outlined">Back</Button>
                    <Button type="submit" variant="contained">
                        Submit Offer
                    </Button>
                </div>
            </form>
        </>
    )
}

export default OfferFormPage2;