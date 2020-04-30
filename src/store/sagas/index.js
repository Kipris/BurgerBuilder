import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { 
    authLogoutSaga, 
    checkAuthTimeoutSaga, 
    authSaga, 
    authCheckStateSaga } from './auth';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authLogoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
}
