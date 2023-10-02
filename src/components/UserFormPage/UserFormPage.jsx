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


function UserFormPage() {

    const history = useHistory();
    // State variables to store selected values for allergies and dietary restrictions
    const [userBio, setUserBio] = useState('');
    const [selectedAllergy, setSelectedAllergy] = useState([]);
    const [selectedDietaryRestriction, setSelectedDietaryRestriction] = useState([])
    const [acceptsHomemade, setAcceptsHomemade] = useState(false);

    

    //function that will upload photo to input field or activate in-app camera
    const addUserPic = (event) => {
        event.preventDefault();
        console.log("in addUserPic")
    }



    // Function to handle changes in the allergy dropdown
    const handleAllergyChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedAllergy(selectedOptions);
    };

    // Function to handle changes in the dietary restriction dropdown
    const handleDietaryRestrictionChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedDietaryRestriction(selectedOptions);
    };

    // Function to handle changes in the "Y or N" checkbox
    const handleAcceptsHomemadeChange = (event) => {
        setAcceptsHomemade(event.target.checked);
    };

    return (
        <>
            <div>
                {/* username here */}
                {/* img url here */}
                <button className='formBtn' onClick={addUserPic}>
                    Upload Photo
                </button>
            </div>
            <form className='formPanel'>
                <div>
                    <label htmlFor="about">
                        Tell us a little about yourself:
                        <input
                            type='text'
                            placeholder='Why did you choose Cup Of Sugar?'
                            value={userBio}
                            required onChange={(event) => setUserBio(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="allergy">
                        Please select allergies:
                        <select id="allergy" multiple={true} value={selectedAllergy} onChange={handleAllergyChange}>
                            <option value="">None</option>
                            <option value="nuts">Nuts</option>
                            <option value="dairy">Dairy</option>
                            <option value="gluten">Gluten</option>
                            <option value="shellfish">Shellfish</option>
                            <option value="soy">Soy</option>
                            <option value="eggs">Eggs</option>
                            <option value="other">Other (please detail in your profile!)</option>
                            {/* Add more allergy options as needed */}
                        </select>
                    </label>
                </div>
                <div>
                    <label htmlFor="dietaryRestriction">
                        Please select dietary restrictions:
                        <select id="dietaryRestriction" multiple={true} value={selectedDietaryRestriction} onChange={handleDietaryRestrictionChange}>
                            <option value="">None</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="vegan">Vegan</option>
                            <option value="glutenFree">Gluten-Free</option>
                            <option value="dairyFree">Dairy-Free</option>
                            <option value="halal">Halal</option>
                            <option value="kosher">Kosher</option>
                            <option value="other">Other (please detail in your profile!)</option>
                            {/* Add more dietary restriction options as needed */}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Accept Homemade Items: Y
                        <input
                            type="checkbox"
                            checked={acceptsHomemade}
                            onChange={handleAcceptsHomemadeChange}
                        />
                    </label>
                </div>
                <div>
                    <button>
                        Submit
                    </button>
                </div>
            </form>
        </>
    )
}

export default UserFormPage;