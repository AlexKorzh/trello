import axios from 'axios';
import browserHistory from '../utils/history';
import token from '../utils/token';
import currentHost from '../utils/host';
import {
    AUTH_USER, 
    AUTH_ERROR, 
    UNAUTH_USER,
    FETCH_MESSAGE
} from '../constants/ActionTypes';

const ROOT_URL = "http://localhost:3090";

export const authError = error => {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export const authUser = () => ({ type: AUTH_USER });

export const signinUser = (email, password) => {
    return dispatch => {
        axios.post(`${currentHost}/signin`, { email, password })
            .then(response => {
                token.set(response.data.token);
                dispatch(authUser());
                browserHistory.push('/');
            })
            .catch(error => {
                dispatch(authError('Bad Login Info'));
            });
    }
}

export const signupUser = (email, password) => {
    return dispatch => {
        axios.post(`${currentHost}/signup`, { email, password })
            .then(response => {
                dispatch(authUser());
                token.set(response.data.token);
                browserHistory.push('/');
            })
            .catch(error => {
                dispatch(authError())
            });
    }
}

export function signoutUser () {
    localStorage.removeItem('token');

    return { type: UNAUTH_USER };
}

export function fetchMessage () {
    return function (dispatch) {
        axios.get(ROOT_URL, { 
            headers: { authorization: token.get() } 
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
            });
    }
}
