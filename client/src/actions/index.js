import axios from 'axios';
import browserHistory from '../utils/history';
import getToken from '../utils/getToken';
import {
    GET_USER_BOARDS,
    AUTH_USER, 
    AUTH_ERROR, 
    UNAUTH_USER,
    FETCH_MESSAGE,
    CREATE_BOARD,
    CREATE_LIST,
    GET_BOARD_LISTS,
    CREATE_CARD,
    GET_CARD_LISTS
} from './actionTypes';

const ROOT_URL = "http://localhost:3090";

/*
 * action creators
 */

export const getUserBoards = (payload) => {
    console.log('=> ', payload)
    return {
        type: GET_USER_BOARDS,
        payload
    }
}

export const getBoardLists = (payload) => {
    console.log('=> ', payload)
    return {
        type: GET_BOARD_LISTS,
        payload
    }
}

export const getCardLists = (payload) => {
    console.log('=> ', payload)
    return {
        type: GET_CARD_LISTS,
        payload
    }
}

export const createBoardAction = (payload) => {
    return {
        type: CREATE_BOARD,
        payload
    }
}

export const createListAction = (payload) => {
    return {
        type: CREATE_LIST,
        payload
    }
}

export const createCardAction = (payload) => {
    return {
        type: CREATE_CARD,
        payload
    }
}

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
            {headers: { authorization: getToken() } }
        ).then(response => {
            dispatch(createBoardAction(response.data.board));
        });
    }
}

export const createCard = (title, listId) => {
    return dispatch => {
        axios.post(
            `${ROOT_URL}/createCard`,
            {title, listId},
            {headers: { authorization: getToken() } }
        ).then(response => {
            dispatch(createCardAction(response.data.card));
        });
    }
}

export const createList = (title, boardId) => {
    return dispatch => {
        axios.post(
            `${ROOT_URL}/boards/createList`,
            {title, boardId},
            {headers: { authorization: getToken() } }
        ).then(response => {
            console.log('Create LIST Response:', response.data.message);
            dispatch(createListAction(response.data.list));
        });
        console.log('CREATE LIST ________>>>');
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
            .catch((error) => {
                console.dir(error);
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
            headers: { authorization: getToken() } 
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
            });
    }
}
