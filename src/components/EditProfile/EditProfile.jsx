import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function EditProfile(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const editProfile = useSelector((store) => store.editProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_PROFILE'})
  }, []);

  const submitEditProfile = () => {
    dispatch({ type: 'UPDATE_PROFILE', payload: editProfile })

  }

  const handleNameChange = (event) => {
    event.preventDefault();
    dispatch({
        type: 'PROFILE_EDIT_ONCHANGE',
        payload: { property: 'name', value: event.target.value }
    });
}

const handleAboutChange = (event) => {
    dispatch({
        type: 'PROFILE_EDIT_ONCHANGE',
        payload: { property: 'about', value: event.target.value }
    });
}

const handleHomemadeChange = (event) => {
    dispatch({
        type: 'PROFILE_EDIT_ONCHANGE',
        payload: { property: 'homemade_pref', value: event.target.value }
    });
}

const handleAllergyChange = (event) => {
    dispatch({
        type: 'PROFILE_EDIT_ONCHANGE',
        payload: { property: 'allergy_type', value: event.target.value }
    });
}
const handleRestrictionChange = (event) => {
    dispatch({
        type: 'PROFILE_EDIT_ONCHANGE',
        payload: { property: 'restriction_type', value: event.target.value }
    });
}



  return (
    <>
    <Button id="submit" variant='outlined' onClick={() => submitEditProfile()} >Edit Profile</Button>
    </>
  );

}

export default EditProfile;
