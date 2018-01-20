import {
    AUTH_USER, 
    AUTH_ERROR, 
    UNAUTH_USER,
    FETCH_MESSAGE
} from '../ActionTypes';

export const authError = error => {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export const authUser = () => ({ type: AUTH_USER });
