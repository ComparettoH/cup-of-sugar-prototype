import React, { useState } from 'react';
import dayjs from 'dayjs';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

function OfferFormPage2() {

    const [itemDescription, setItemDescription] = useState('')
    const [persihableItem, setPerishableItem] = useState(false)
    const [homemadeItem, setHomemadeItem] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedDate, setSelectedDate] = useState(null);


    const handleItemCategorySelection = (event) => {
        setSelectedCategory(event.target.value)
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <>
            <form className='formPanel'>
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
                                onChange={handleItemCategorySelection}
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <label htmlFor="calendar">
                            Best if used by
                            <MobileDatePicker
                                value={selectedDate}
                                onChange={handleDateChange} />
                        </label>
                    </LocalizationProvider>
                </div>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <label htmlFor="calendar">
                            Claim by
                            <MobileDatePicker
                                value={selectedDate}
                                onChange={handleDateChange} />
                        </label>
                    </LocalizationProvider>
                </div>
            </form>
            <div>
                <button type="submit">
                    Submit Offer
                </button>
            </div>
        </>
    )
}

export default OfferFormPage2;