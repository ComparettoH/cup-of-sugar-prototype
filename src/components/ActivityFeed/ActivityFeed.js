import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// displays user activity and all offers, requests, and shares
function ActivityFeed(props) {
    const dispatch = useDispatch();
    const store = useSelector((store) => store);
    const [heading, setHeading] = useState('Functional Component');

    //   gets activity information
    useEffect(() => {

        dispatch({ type: 'FETCH_OFFERS' });
        dispatch({ type: 'FETCH_REQUESTS' });
        dispatch({ type: 'FETCH_SHARES' })

    }, []);

    return (
        <div>
            <h2>{heading}</h2>
        </div>
    );
}

export default ActivityFeed;