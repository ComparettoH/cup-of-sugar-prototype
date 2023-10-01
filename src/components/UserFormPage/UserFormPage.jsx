import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function UserFormPage() {

    const history = useHistory();

    //function that will upload photo to input field or activate in-app camera
    const addUserPic = (event) => {
        event.preventDefault();
    }
    return (
        <>
            <div>
                {/* username here */}
                {/* img url here */}
                <button className='formBtn' onClick={addUserPic}>
                    Upload Photo
                </button>
            </div>
            <form>
                <div>
                    <label htmlFor="about">
                        Tell us a little about yourself:
                        <input
                            type="text"
                            placeholder='Why did you choose Cup Of Sugar?'

                        />
                    </label>
                </div>
            </form>
        </>
    )
}

export default UserFormPage;