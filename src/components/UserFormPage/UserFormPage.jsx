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


function UserFormPage() {



    const history = useHistory();
    const dispatch = useDispatch();
    const errors = useSelector((store) => store.errors);
    const allergy = useSelector((store) => store.allergy);
    const restriction = useSelector((store) => store.restriction);
    // State variables to store selected values for allergies and dietary restrictions
    const [name, setName] = useState('');
    const [userURL, setUserURL] = useState('');
    const [userBio, setUserBio] = useState('');
    const [selectedAllergy, setSelectedAllergy] = useState([]);
    const [selectedDietaryRestriction, setSelectedDietaryRestriction] = useState([])
    const [acceptsHomemade, setAcceptsHomemade] = useState(true);

    useEffect(() => {
        getAllergyList();
    }, [])

    const getAllergyList = () => {
        dispatch({ type: 'FETCH_ALLERGY' })
    }
    const newProfileHandleSubmit = (event) => {
        event.preventDefault();
        console.log("in newProfileHandleSubmit")

        let newProfile = {
            name: name,
            homemade_pref: acceptsHomemade,
            about: userBio,
            imgpath: userURL,
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

    // console.log('testing on clientside in UserForm', allergy, restriction)
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
                <div>
                    <label htmlFor='image'>
                        Choose an image or photo of yourself:
                        <input
                            type="file"
                            placeholder='Upload URL here'
                            value={userURL}
                            onChange={(event) => setUserURL(event.target.value)}
                        />
                        <img src={userURL} alt="user image" />

                        {/* <button className='formBtn' onClick={addUserPic}>
                            Upload Photo
                        </button> */}
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
                            id="dietaryRestriction"
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
                            {/* Add more allergy options as needed */}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl fullWidth={true}>
                        <InputLabel htmlFor="dietaryRestriction">Please select dietary restrictions:</InputLabel>
                        <Select
                            id="dietaryRestriction"
                            multiple
                            value={selectedDietaryRestriction}
                            onChange={(event) => setSelectedDietaryRestriction(event.target.value)}
                            input={<OutlinedInput label="Please select dietary restrictions:" />}
                        >
                            <MenuItem value="none">None</MenuItem>
                            <MenuItem value="vegetarian">Vegetarian</MenuItem>
                            <MenuItem value="vegan">Vegan</MenuItem>
                            <MenuItem value="glutenFree">Gluten-Free</MenuItem>
                            <MenuItem value="dairyFree">Dairy-Free</MenuItem>
                            <MenuItem value="halal">Halal</MenuItem>
                            <MenuItem value="kosher">Kosher</MenuItem>
                            <MenuItem value="other">Other (please detail in your profile!)</MenuItem>
                            {/* Add more dietary restriction options as needed */}
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
