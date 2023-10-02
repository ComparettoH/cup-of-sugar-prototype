import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: for User Profile Information/Settings
function* setUserInfo (action) {
  try {
    const newUserInfo = yield axios.post('/api/user_profile', action.payload);
    console.log('in user_profile SAGA', newUserInfo)
    yield put({ type: 'ADD_USER_INFO', payload: newUserInfo.data});
  }
  catch (error) {
    console.log(`User's profile information POST request failed`, error);
  }
}

function* userInfoSaga() {
  yield takeLatest('SET_USER_INFO', setUserInfo);
}

export default userInfoSaga;