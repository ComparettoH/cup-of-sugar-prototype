import React, { useState } from 'react';
import useReduxStore from '../../hooks/useReduxStore';
import { useEffect } from "react";
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

    const dispatch = useDispatch();
    const history = useHistory();
    const store = useReduxStore();
    const group = useSelector((store) => store.group);
    const groupMembers = useSelector((store) => store.groupMembers)

    const [selectedNeighbor, setSelectedNeighbor] = useState('');

    const handleNeighborSelection = (event) => {
        setSelectedNeighbor(event.target.value);
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_GROUP_INFO' });
    }, [dispatch]);

    useEffect(() => {
        dispatch({ type: 'FETCH_GROUP_MEMBERS' });
    }, [dispatch]);

    console.log('testing group info data', group, groupMembers)

    return (
        <>
            <div>
                <h2>{group[0].group_name}</h2>
                {/* Group name renders here */}
            </div>
            <div>
                <h4>Sharing location is: 
                <br></br>
                    {group[0].share_location}
                </h4>
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
                          {groupMembers.map((member) =>
                                <MenuItem key={member.id} value={member.id}
                                >
                                    {member.name}
                                </MenuItem>
                            )}    
                    </Select>
                </FormControl>
            </div>
            </form>
        </>
    );
}

export default UserViewGroupPage;