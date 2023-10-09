import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

// This is a worker saga; will be fired upon 'FETCH_GROUP_INFO' actions
function* fetchGroupInfo() {
    try {
        // gets all Group info & members to be displayed in the Group page
        const response = yield axios.get('api/group');
        yield put({ type: 'SET_GROUP_INFO', payload: response.data });
    } catch (error) {
        console.log('fetchGroupInfo get request failed for Group', error)
    }
}

function* groupSaga() {
    yield takeLatest('FETCH_GROUP_INFO', fetchGroupInfo);
};

export default groupSaga;