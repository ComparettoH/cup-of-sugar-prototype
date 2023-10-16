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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
// import GroupMemberModal from '../GroupMemberModal/GroupMemberModal';

function UserViewGroupPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const store = useReduxStore();
    const group = useSelector((store) => store.group);
    const user = useSelector((store) => store.user);
    const groupMembers = useSelector((store) => store.groupMembers)
    const selectedMember = useSelector((store) => store.selectedMember)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedNeighbor, setSelectedNeighbor] = useState(null);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 250,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    console.log('groupMembers:', groupMembers)


    const handleNeighborSelection = (member) => {
        console.log('member:', member)
        setSelectedNeighbor(member);
        handleOpen();

        dispatch({ type: 'SET_SELECTED_MEMBER', payload: member })

    }

    function removeDuplicates(array) {
        return [...new Set(array)];
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_GROUP_INFO' });
    }, []);

    useEffect(() => {
        dispatch({ type: 'FETCH_GROUP_MEMBERS' });
    }, []);

    console.log('testing group info data', group, groupMembers)

    const navAddMember = () => {
        history.push('/adminaddmember')
    }
    return (
        <>
           <Box sx={{ mx: '1rem' }}>
            <Typography variant='h4' align="center">
                {group[0]?.group_name}
            </Typography><br></br>
            <Typography variant="h5" sx={{fontWeight: 'bold'}}>
                Your sharing location</Typography>
               <Typography variant='h6'>
                {group[0]?.share_location}
                </Typography>
                <br></br>
            <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                Meet your neighbors </Typography>
               
            <FormControl fullWidth={true}>
                <InputLabel htmlFor="neighbor">Select from neighbors:</InputLabel>
                <Select
                    id="neighbor"
                    value={selectedNeighbor}
                    input={<OutlinedInput label="Select from neighbors:" />}
                >
                    {Array.isArray(groupMembers) && groupMembers.map((member) =>
                        <MenuItem

                            key={member.id}
                            value={member.id}
                            onClick={() => { handleNeighborSelection(member) }}
                        >
                            {member.name}

                        </MenuItem>

                    )}

                </Select>
               
                <br></br>
            </FormControl>
            </Box>

            <Modal

                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {selectedMember.name}
                        <img src={selectedMember.imgpath} alt="Neighbor's profile photo" />
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {selectedMember.about}
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Allergies: {selectedMember && selectedMember.allergy_type
                            ? removeDuplicates(selectedMember.allergy_type).join(', ')
                            : 'No allergies'}
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Dietary Restrictions: {selectedMember && selectedMember.restriction_type
                            ? removeDuplicates(selectedMember.restriction_type).join(', ')
                            : 'No restrictions'}
                    </Typography>
                </Box>
            </Modal>

            {user.role > 0 &&
            <Grid align="center">
                <Button variant='contained' onClick={() => navAddMember()}>
                    Add New Member
                </Button>
            </Grid>
            }

        </>
    );

}

export default UserViewGroupPage;