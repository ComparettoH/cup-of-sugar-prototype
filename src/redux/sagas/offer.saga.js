import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

// This is a worker saga; will be fired upon 'FETCH_USER_PROFILE' actions

function* fetchOffer() {
    try {
        const config = {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        };
        const response = yield axios.get('api/offer', config);
        yield put({ type: 'SET_OFFERS', payload: response.data});
    } catch (error) {
        console.log('fetchOffer get request failed', error)
    }

}

function* offerSaga() {
    yield takeLatest('FETCH_OFFER', fetchOffer);
    

};

export default offerSaga;