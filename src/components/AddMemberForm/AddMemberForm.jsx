import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

function AddMemberForm(){

    const history = useHistory();
    const dispatch = useDispatch();
    const [userEmail, setUserEmail] = useState('');
    const [adminMessage, setAdminMessage] = useState('');

    const adminInvite = (event) =>{
        console.log("sending admin invite")
    }

    return (
        <>
        <form className='formPanel' onSubmit={adminInvite}>
            <div>
                <label htmlFor='userEmail'>
                    Email:
                    <input
                        type="text"
                        placeholder="Please enter admin email here"
                        value={userEmail}
                        onChange={(event) => setUserEmail(event.target.value)}
                        />
                </label>
            </div>
            <div>
                <label htmlFor='adminMessage'>
                    Message:
                    <input
                        type="text"
                        placeholder="post invite information here"
                        value={adminMessage}
                        onChange={(event) => setAdminMessage(event.target.value)}
                        />
                </label>
            </div>
            <div>
                    <Button variant='contained' id="submit">
                        Send Invite
                    </Button>
                </div>
                </form>    
        </>
    );
}

export default AddMemberForm;