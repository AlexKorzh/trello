import axios from 'axios';
import browserHistory from '../utils/history';
import token from '../utils/token';
import {
    GET_BOARDS,
    AUTH_USER, 
    AUTH_ERROR, 
    UNAUTH_USER,
    FETCH_MESSAGE,
    CREATE_BOARD,
    CREATE_LIST,
    GET_BOARD_LISTS,
    CREATE_CARD,
    GET_LIST_CARDS,
    DELETE_BOARD
} from '../constants/ActionTypes';

const ROOT_URL = "http://localhost:3090";



//


import currentHost from '../utils/host';

export const getBoards = payload => {
    return {
        type: GET_BOARDS,
        payload
    }
}

export const deleteBoard = payload => {
    return {
        type: DELETE_BOARD,
        payload
    }
}

export const getBoardLists = payload => {
    return {
        type: GET_BOARD_LISTS,
        payload
    }
}

export const getListCards = payload => {
    return {
        type: GET_LIST_CARDS,
        payload
    }
}

export const createBoard = payload => {
    return {
        type: CREATE_BOARD,
        payload
    }
}

export const createList = payload => {
    return {
        type: CREATE_LIST,
        payload
    }
}

export const createCard = payload => {
    return {
        type: CREATE_CARD,
        payload
    }
}

export const authError = error => {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export const authUser = () => ({type: AUTH_USER});

export const deleteBoardMiddleware = boardId => {
    return dispatch => {
        axios.post(
            `${currentHost}/deleteBoard`,
            {boardId},
            {headers: { authorization: token.get() }}
        ).then(response => {
            dispatch(deleteBoard(response.data.board));
        });
    }
}

export const createBoardMiddleware = title => {
    return dispatch => {
        axios.post(
            `${currentHost}/createBoard`,
            {title},
            {headers: { authorization: token.get() }}
        ).then(response => {
            dispatch(createBoard(response.data.board));
        });
    }
}

export const createCardMiddleware = (title, listId) => {
    return dispatch => {
        axios.post(
            `${currentHost}/createCard`,
            {title, listId},
            {headers: { authorization: token.get() }}
        ).then(response => {
            dispatch(createCard(response.data.card));
        });
    }
}

export const createListMiddleware = (title, boardId) => {
    return dispatch => {
        axios.post(
            `${currentHost}/boards/createList`,
            {title, boardId},
            {headers: { authorization: token.get() }}
        ).then(response => {
            dispatch(createList(response.data.list));
        });
    }
}




//


export const signinUser = (email, password) => {
    return dispatch => {
        axios.post(`${currentHost}/signin`, { email, password })
            .then(response => {
                token.set(response.data.token);
                dispatch(authUser());
                browserHistory.push('/boards');
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
                browserHistory.push('/boards');
            })
            .catch(error => {
                console.log(error);
                debugger;
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
