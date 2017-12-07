import axios from 'axios';
import browserHistory from '../utils/history';
import getToken from '../utils/getToken';
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

export const deleteBoardMiddleware = boardId => {
    return dispatch => {
        axios.post(
            `${currentHost}/deleteBoard`,
            {boardId},
            {headers: { authorization: getToken() }}
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
            {headers: { authorization: getToken() }}
        ).then(response => {
            dispatch(createBoard(response.data.board));
        });
    }
}

export const createCardMiddleware = (title, listId, boardId) => {
    return dispatch => {
        axios.post(
            `${currentHost}/createCard`,
            {title, listId, boardId},
            {headers: { authorization: getToken() }}
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
            {headers: { authorization: getToken() }}
        ).then(response => {
            dispatch(createList(response.data.list));
        });
    }
}






export const signinUser = ({ email, password }) => {
    return dispatch => {
        axios.post(`${currentHost}/signin`, { email, password })
            .then(response => {


                dispatch({ type: AUTH_USER });

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
