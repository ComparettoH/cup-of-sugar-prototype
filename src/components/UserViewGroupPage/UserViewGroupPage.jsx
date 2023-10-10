import React, { useState } from 'react';
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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import e from 'express';

function UserViewGroupPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const group = useSelector((store) => store.group);
    const groupMembers = useSelector((store) => store.groupMembers)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedNeighbor, setSelectedNeighbor] = useState(null);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: '0px 0px 24px 0px rgba(0,0,0,0.75)',
        p: 4,
    };

    const handleNeighborSelection = (member) => {
        setSelectedNeighbor(member);
        handleOpen();
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_GROUP_INFO' });
    }, []);

    useEffect(() => {
        dispatch({ type: 'FETCH_GROUP_MEMBERS' });
    }, []);

    console.log('testing group info data', group, groupMembers)

    const modalContent = (
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Your neighbor: {selectedNeighbor}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Neighbor info: get here
            </Typography>
        </Box>
    );

    return (
        <>
            <div>
                <h2>{group[0]?.group_name}</h2>
                {/* Group name renders here */}
            </div>
            <div>
                <h4>Your sharing location is:
                    <br></br>
                    {group[0]?.share_location}
                </h4>
                {/* Sharing location name renders here */}
            </div>
            <form className='formPanel'>
                <div>
                    <h4>Meet your neighbors who are a part of {group[0]?.group_name}:</h4>
                    <FormControl fullWidth={true}>
                        <InputLabel htmlFor="neighbor">Select from neighbors:</InputLabel>
                        <Select
                            id="neighbor"
                            value={selectedNeighbor}
                            input={<OutlinedInput label="Select from neighbors:" />}
                        >
                            {groupMembers.map((member) =>
                                <MenuItem
                                    key={member.id}
                                    value={member.id}
                                    onClick={() => { handleNeighborSelection(member) }}
                                >
                                    {member.name}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    {modalContent}
                </Modal>
            </form>

        </>
    );
}

export default UserViewGroupPage;