import { put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actionCreators from '../actions/index';

export function* authLogoutSaga(action) {
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'expirationDate');
    yield call([localStorage, 'removeItem'], 'userId');
    yield put(actionCreators.authLogoutSucced());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actionCreators.authLogout());
}

export function* authSaga(action) {
    yield put(actionCreators.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBj59k-sg-O42DeXckX3IkBbHrjM1Vf-u0';
    if (!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBj59k-sg-O42DeXckX3IkBbHrjM1Vf-u0';
    }
    try {
        const response = yield axios.post(url, authData);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield call([localStorage, 'setItem'], 'token', response.data.idToken);
        yield call([localStorage, 'setItem'], 'expirationDate', expirationDate);
        yield call([localStorage, 'setItem'], 'userId', response.data.localId);
        yield put(actionCreators.authSuccess(response.data.idToken, response.data.localId));
        yield put(actionCreators.checkAuthTimeout(response.data.expiresIn));
    } catch(error) {
        yield put(actionCreators.authFail(error.response.data.error));    
    }
}

export function* authCheckStateSaga(action) {
    const token = yield call([localStorage, 'getItem'], 'token');
    if (!token) {
        yield put(actionCreators.authLogout());
    }
    const expirationDate = yield new Date(call([localStorage, 'getItem'], 'expirationDate'));
    if (expirationDate <= new Date()) {
        yield put(actionCreators.authLogout());
    } else {
        const userId = yield call([localStorage, 'getItem'], 'userId');
        yield put(actionCreators.authSuccess(token, userId));
        yield put(actionCreators.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
}