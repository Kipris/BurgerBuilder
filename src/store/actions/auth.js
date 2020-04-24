import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        // axios.post('', {email, password})
        //     .then(response => {
        //         dispatch(authSuccess(response.data))
        //     })
        //     .catch(error => {
        //         dispatch(authFail(error))
        //     })
    }
}
