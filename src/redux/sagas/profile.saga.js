import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

// This is a worker saga; will be fired upon 'FETCH_USER_PROFILE' actions

function* fetchUserProfile() {
    try {
        const config = {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        };
        const response = yield axios.get('api/profile', config);
        yield put({ type: 'SET_USER_PROFILE', payload: response.data});
    } catch (error) {
        console.log('fetchUserProfile get request failed', error)
    }

}


function* profileSaga() {
    yield takeLatest('FETCH_USER_PROFILE', fetchUserProfile);

};

export default profileSaga;