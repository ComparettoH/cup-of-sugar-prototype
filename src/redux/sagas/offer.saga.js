import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

// This is a worker saga; will be fired upon 'FETCH_USER_PROFILE' actions

function* fetchOffers() {
    try {
        const config = {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        };
        // gets all offers to be displayed in the activity feed
        const response = yield axios.get('api/offer', config);
        yield put({ type: 'SET_OFFERS', payload: response.data});
    } catch (error) {
        console.log('fetchOffer GET request failed', error)
    }

}


function* fetchOfferItem() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get('api/offer', config);
        yield put({ type: 'SET_OFFER_ITEM', payload: response.data });
    } catch (error) {
        console.log('fetchOfferItem get request failed', error)
    }
}

function* addOffer(action) {
    try {
        // Posts a new offer to the database
        const newOffer = yield axios.post('/api/offer', action.payload);
        console.log('in offer SAGA', newOffer)
        yield put({ type: 'CREATE_NEW_OFFER', payload: newOffer.data});
      }
      catch (error) {
        console.log(`addOffer POST request failed`, error);
}
}

function* offerSaga() {
    yield takeLatest('FETCH_OFFERS', fetchOffers);

    yield takeLatest('FETCH_OFFER_ITEM', fetchOfferItem);

    yield takeLatest('ADD_OFFER', addOffer);


};

export default offerSaga