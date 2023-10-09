
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import WebcamPage from '../WebcamPage/WebcamPage'
// material ui imports
import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { TextField } from '@mui/material';



function UserFormPage() {



    const history = useHistory();
    const dispatch = useDispatch();
    const errors = useSelector((store) => store.errors);
    const allergy = useSelector((store) => store.allergy);
    const restriction = useSelector((store) => store.restriction);
    // State variables to store selected values for allergies and dietary restrictions
    const [name, setName] = useState('');
    const [profImage, setProfImage] = useState('');
    const [userBio, setUserBio] = useState('');
    const [selectedAllergy, setSelectedAllergy] = useState([]);
    const [selectedDietaryRestriction, setSelectedDietaryRestriction] = useState([])
    const [acceptsHomemade, setAcceptsHomemade] = useState(true);

    useEffect(() => {
        getAllergyList();
    }, [])

    useEffect(() => {
        getRestrictionList();
    }, [])

    const getAllergyList = () => {
        dispatch({ type: 'FETCH_ALLERGY' })
    }

    const getRestrictionList = () => {
        dispatch({ type: 'FETCH_RESTRICTION' })
    }

    const newProfileHandleSubmit = (event) => {
        event.preventDefault();
        console.log("in newProfileHandleSubmit")

        let newProfile = {
            name: name,
            homemade_pref: acceptsHomemade,
            about: userBio,
            imgpath: profImage,
            allergy_type: selectedAllergy,
            restriction_type: selectedDietaryRestriction
        }

        console.log('testing newProfile', newProfile)
        dispatch({
            type: 'ADD_USER_PROFILE', payload: newProfile
        })
    }
    //function that will upload photo to input field or activate in-app camera
    // const addUserPic = (event) => {
    //     event.preventDefault();
    //     console.log("in addUserPic", event.target.files)
    //     setUserURL(URL.createdObjectURL(event.target.files[0]));
    // }

    //funtion that will handle homemade pref selection
    const homemadePrefChange = (event) => {
        event.preventDefault();
        setAcceptsHomemade(event.target.value);
    }

    console.log('testing on clientside in UserForm', allergy, restriction)
    return (
        <>
            <form className='formPanel' onSubmit={newProfileHandleSubmit}>
                <div>
                    <label htmlFor='name'>
                        Name
                        <input
                            type="text"
                            placeholder='Your name here'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </label>
                </div>
                {/* webcam page to take and display picture for your profile */}
                {/* <WebcamPage
                // imageGallery={imageGallery}
                // fetchImages={fetchImages}
                /> */}
                <div>
                    <label htmlFor='image'>
                        Choose an image or photo of yourself:
                        <TextField
                            onChange={e => setProfImage(e.target.files[0])}
                            type="file"
                            accept="image/*"
                            variant='filled'

                        />
                    </label>
                </div>

                <div>
                    <label htmlFor="about">
                        Tell us a little about yourself:
                        <input
                            type='text'
                            placeholder='Why did you choose Cup Of Sugar?'
                            value={userBio}
                            onChange={(event) => setUserBio(event.target.value)}
                            sx={{ width: '100%' }}
                        />
                    </label>
                </div>
                <div>
                    <FormControl fullWidth={true}>
                        <InputLabel htmlFor="allergy">Please select allergies:</InputLabel>
                        {/* Allergy Drop Down menu */}
                        <Select
                            id="allergies"
                            multiple
                            value={selectedAllergy}
                            onChange={(event) => setSelectedAllergy(event.target.value)}
                            input={<OutlinedInput label="Please select dietary restrictions:" />}
                        >
                            {allergy.map((option1) =>
                                <MenuItem key={option1.id} value={option1.id}
                                >
                                    {option1.allergy_type}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl fullWidth={true}>
                        <InputLabel htmlFor="dietaryRestriction">Please select dietary restrictions:</InputLabel>
                        {/* Dietary Restriction Drop Down menu */}
                        <Select
                            id="dietaryRestriction"
                            multiple
                            value={selectedDietaryRestriction}
                            onChange={(event) => setSelectedDietaryRestriction(event.target.value)}
                            input={<OutlinedInput label="Please select dietary restrictions:" />}
                        >
                             {restriction.map((option2, i) =>
                            <MenuItem key= {i} value={option2.id}>{option2.restriction_type}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Accept Homemade Items:</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={acceptsHomemade}
                            onChange={homemadePrefChange}
                        >
                            <FormControlLabel value='true' control={<Radio />} label="Yes" />
                            <FormControlLabel value='false' control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                    {/* <
                            checked={acceptsHomemade}
                            onChange={(event) => setAcceptsHomemade(event.target.value)}
                        /> */}
                </div>
                <div>
                    <button type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
}

export default UserFormPage;
