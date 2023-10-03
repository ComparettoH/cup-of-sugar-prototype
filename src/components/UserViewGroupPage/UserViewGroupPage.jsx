import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function UserViewGroupPage() {

    const history = useHistory();

    const [selectedNeighbor, setSelectedNeighbor] = useState('');

    const handleNeighborSelection = (event) => {
        setSelectedNeighbor(event.target.value);
    }

    return (
        <>
            <div>
                <h2>//Group name here//</h2>
                {/* Group name renders here */}
            </div>
            <div>
                <h4>Sharing location is: </h4>
                {/* Sharing location name renders here */}
            </div>
            <form className='formPanel'>
            <div>
                <h4>Meet your neighbors who are a part of :</h4>
                <FormControl fullWidth={true}>
                    <InputLabel htmlFor="neighbor">Select from neighbors:</InputLabel>
                    <Select
                        id="neighbor"
                        value={selectedNeighbor}
                        onChange={handleNeighborSelection}
                        input={<OutlinedInput label="Select from neighbors:" />}
                        >
                    </Select>
                </FormControl>
            </div>
            </form>
        </>
    );
}

export default UserViewGroupPage;