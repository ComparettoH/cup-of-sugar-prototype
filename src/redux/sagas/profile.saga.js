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

function* updateProfile (action) {
    try {
        const config = {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        };
        yield axios ({
            method: 'PUT',
            url: 'api/profile', 
            config,
            data: action.payload
        });
        yield put({ 
            type: 'FETCH_USER_PROFILE'
        });
    } catch (error) {
        console.log('updateProfile request failed', error)

    }
}


function* profileSaga() {
    yield takeLatest('FETCH_USER_PROFILE', fetchUserProfile);
    yield takeLatest('UPDATE_PROFILE', updateProfile);
};

export default profileSaga;