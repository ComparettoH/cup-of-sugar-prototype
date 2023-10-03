import React from "react";
import { useHistory } from "react-router-dom";

// This is a static page to show how the app works
function HowItWorks() {

    const history = useHistory();

    // takes the user to the user form after registration
    const handleGetStarted = () => {
        history.push('/userform')
    };

    return (
        <>
        <button onClick={() => handleGetStarted()}>Get Started</button>
        </>
    )
};

export default HowItWorks;