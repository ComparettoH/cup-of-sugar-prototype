// React and Redux imports 
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useReduxStore from '../../hooks/useReduxStore';
import { useHistory } from "react-router-dom";

// CSS import

// Material UI imports



// This function will fetch user profile info:
// Username, Picture, About Section, Allergies, and Dietary Restrictions,
// allow for editing user profile info (navigate to user form),
// and allow for navigation to group info view
// Both bottom and top nav bar will be available

function UserProfile() {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const store = useReduxStore();

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_PROFILE' });
    }, [dispatch]);

};

export default UserProfile;