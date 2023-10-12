// React and Redux imports 
import React from "react";
import dayjs from 'dayjs';

import { useEffect, useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from "react-redux";
import useReduxStore from '../../hooks/useReduxStore';
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MobileDateTimePicker } from '@mui/x-date-pickers';



function RequestFormPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [requestedItem, setRequestedItem] = useState('')
    const [itemDescription, setItemDescription] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedDate, setSelectedDate] = useState(null);

    // const handleItemCategorySelection = (event) => {
    //     setSelectedCategory(event.target.value)
    // }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmitRequest = (event) => {
        event.preventDefault();

        let timestamp = new Date();

        let newRequest = {
            item_name: requestedItem,
            description: itemDescription,
            category_type: selectedCategory,
            requested_on: timestamp,
            expires_on: selectedDate,
        };
        // dispatch to request saga
        dispatch({
            type: 'ADD_REQUEST', payload: newRequest
        })
        // sends user to Activity Feed to confirm request post
        history.push('/activity')
    }

    return (
        <>
            <div>
                <h3>I wish I had:</h3>
            </div>
            <form onSubmit={handleSubmitRequest} className='formPanel'>
                <div>
                    <label htmlFor="headline">
                        Headline
                        <TextField
                            type='text'
                            placeholder="What item do you need?"
                            value={requestedItem}
                            onChange={(event) => setRequestedItem(event.target.value)}
                            fullWidth
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
                    <label htmlFor="itemDescription">
                        Description
                        <TextField
                            id="itemDescription"
                            type='text'
                            multiline rows={4}
                            placeholder="How much do you need? What do you need it for? Provide some details."
                            value={itemDescription}
                            onChange={(event) => setItemDescription(event.target.value)}
                            fullWidth
                        />
                    </label>
                </div>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <label htmlFor="calendar">
                            I need this by
                            <MobileDateTimePicker
                                value={selectedDate}
                                onChange={handleDateChange} />
                        </label>
                    </LocalizationProvider>
                </div>


            
            <Button id="submit" variant="contained">
                Request
            </Button>
            </form>

        </>)
}

export default RequestFormPage