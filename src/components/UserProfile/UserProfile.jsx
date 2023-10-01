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
    const user = useSelector((store) => store.user);

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_PROFILE' });
    }, [dispatch]);

    return (
        <>
            <header>
                <h1>Cup of Sugar</h1>
                {/* TODO: add alternate image if photo is null */}
                <img src={user.imgpath} />
            </header>

                <section className="user-profile">

                    <h2>{user.username}</h2>

                    <h3>About Me</h3>
                    <h2>{user.about}</h2>

                    <h3>My Allergies</h3>
                    <h2>{user.allergies}</h2>

                    <h3>My Dietary Restrictions</h3>
                    <h2>{user.dietary_restrictions}</h2>

                

                </section >
    
        </>
    )

};

export default UserProfile;