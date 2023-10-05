import React from "react";
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';

// This is a static page to show how the app works
function HowItWorks() {

    const history = useHistory();

    // takes the user to the user form after registration
    const handleGetStarted = () => {
        history.push('/userform')
    };

    return (
        <>
        <Button variant="outlined" onClick={() => handleGetStarted()}>Get Started</Button>
        </>
    )
};

export default HowItWorks;