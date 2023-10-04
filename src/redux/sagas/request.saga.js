import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

// This is a worker saga; will be fired upon 'FETCH_USER_PROFILE' actions

function* fetchRequests() {
    try {
        const config = {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        };
        // gets all requests to be displayed in activity feed
        const response = yield axios.get('api/request', config);
        yield put({ type: 'SET_REQUESTS', payload: response.data});
    } catch (error) {
        console.log('fetchRequest get request failed', error)
    }

}

function* requestSaga() {
    yield takeLatest('FETCH_REQUESTS', fetchRequests);
    

};

export default requestSaga;