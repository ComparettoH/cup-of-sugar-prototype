// React and Redux imports 
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

    const dispatch = useDispatch();
    const history = useHistory();
    const store = useReduxStore();
    const profile = useSelector((store) => store.profile);

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_PROFILE' });
    }, [dispatch]);


        // will this send user to original user profile form or new page EditProfile?
    const handleEditProfile = () => {
        // dispatch to 'SET_EDIT_PROFILE' with payload goes here
        // This will need an edit_profile reducer
        // history.push(`edit_profile`)
    }

    const handleGroupInfo = () => {
        // history.push(`/group_page`)
    }

    return (
        <>
            <header>
                <h1>Cup of Sugar</h1>
                {/* TODO: add alternate image if photo is null */}
                <img src={profile.imgpath} />
            </header>

                <section className="user-profile">

                    <h2>{profile[0].name}</h2>

                    <h3>About Me</h3>
                    {/* This will change to profile reducer */}
                    <h2>{profile[0].about}</h2>

                    <h3>My Allergies</h3>
                    {/* This will change based on allergy reducer*/}
                    <h2>{profile[0].allergy_type}</h2>

                    <h3>My Dietary Restrictions</h3>
                    {/* This will change based on dietary restrictions reducer*/}
                    <h2>{profile[0].restriction_type}</h2>

                </section >

            <footer>
                <button onClick={() => handleEditProfile()}>Edit</button>
                <button onClick={() => handleGroupInfo()}>Group Info</button>
            </footer>
    
        </>
    )

};

export default UserProfile;