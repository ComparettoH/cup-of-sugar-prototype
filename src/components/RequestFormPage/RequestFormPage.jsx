// React and Redux imports 
import React from "react";
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

function RequestFormPage() {

    const [requestedItem, setRequestedItem] = useState('')
    const [itemDescription, setItemDescription] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')

    const handleItemCategorySelection = (event) => {
        setSelectedCategory(event.target.value)
    }

    return (
        <>
            <div>
                <h3>I wish I had:</h3>
            </div>
            <form className='formPanel'>
                <div>
                    <label htmlFor="headline">
                        Headline
                        <input
                            fullWidth={true}
                            type='text'
                            placeholder="What item do you need?"
                            value={requestedItem}
                            required onChange={(event) => setRequestedItem(event.target.value)}
                            sx={{ width: '100%' }}
                        />
                    </label>
                </div>
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
                <div>
                    <label htmlFor="itemDescription">
                        Description
                        <input
                            fullWidth={true}
                            type='text'
                            placeholder="How much do you need? What do you need it for? Provide some details. "
                            value={itemDescription}
                            required onChange={(event) => setItemDescription(event.target.value)}
                            sx={{ width: '100%' }}
                        />
                    </label>
                </div>
            </form>
        </>)
}

export default RequestFormPage