import axios from 'axios';
import browserHistory from '../containers/App/history';
import { 
    AUTH_USER, 
    AUTH_ERROR, 
    UNAUTH_USER,
    FETCH_MESSAGE,
    CREATE_BOARD,
    CREATE_LIST
} from './types';

const ROOT_URL = "http://localhost:3090";

const authorization = localStorage.getItem('token');

export function authError (error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export const createBoard = title => {
    return dispatch => {
        axios.post(
            `${ROOT_URL}/createBoard`,
            {title},
            {headers: {authorization}}
        ).then(response => {
            console.log('Create Board Response:', response.data.message);
        });

        console.log('C R E A T E = B O A R D');
        dispatch({type: CREATE_BOARD});
    }
}

export const createList = title => {
    return dispatch => {
        axios.post(
            `${ROOT_URL}/boards`,
            {title},
            {headers: {authorization}}
        ).then(response => {
            console.log('Create LIST Response:', response.data.message);
        });

        console.log('CREATE LIST ________>>>');
        dispatch({type: CREATE_LIST});
    }
}

export function signinUser ({ email, password }) {
    return function (dispatch) {
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then((response) => {
                // If request is good...
                // - Update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });
                // - Save the JWT token to the localStorage fot the future request
                localStorage.setItem('token', response.data.token);
                // - redirect to the route `/feature`
                console.log('Auth -->', response);
                browserHistory.push('/boards');
            })
            .catch(() => {
                // If request it bad...
                // - Show an error to the user
                dispatch(authError('Bad Login Info'));
            });    
    } 
}

export function signupUser ({ email, password }) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);

                browserHistory.push('/boards');
            })
            .catch(serve => {
                dispatch(authError(serve.response.data.error))
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
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
            });
    }
}
