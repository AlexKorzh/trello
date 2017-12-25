import token from '../utils/token';
import currentHost from '../utils/host';
import axios from 'axios';
import { fetchCards } from './cards';
import {
    CREATE_LIST,
    GET_LISTS,
    UPDATE_LIST,
    DELETE_LIST,
    SET_BOARD_ID
} from '../constants/ActionTypes';

export const createList = payload => {
    return {
        type: CREATE_LIST,
        payload
    }
}

export const getLists = payload => {
    return {
        type: GET_LISTS,
        payload
    }
}

export const setBoardId = id => {
    return {
        type: SET_BOARD_ID,
        id
    }
}

export const updateList = payload => {
    return {
        type: UPDATE_LIST,
        payload
    }
}

export const deleteList = payload => {
    return {
        type: DELETE_LIST,
        payload
    }
}

export const createListMiddleware = (title, boardId) => {
    return dispatch => {
        axios.post(
            `${currentHost}/createList`,
            { title, boardId },
            { headers: { authorization: token.get() } }
        ).then(response => {
            dispatch(createList(response.data.list));
        });
    }
}

export const updateListMiddleware = (listId, title) => {
    return dispatch => {
        axios.post(
            `${currentHost}/updateList`,
            { listId, title },
            { headers: { authorization: token.get() } }
        ).then(response => {
            dispatch(updateList(response.data.list));
        });
    }
}

export const deleteListMiddleware = listId => {
    return dispatch => {
        axios.post(
            `${currentHost}/deleteList`,
            {listId},
            {headers: { authorization: token.get() }}
        ).then(response => {
            dispatch(deleteList(response.data.list));
        });
    }
}

export const fetchLists = ({id, type}) => dispatch => {
    axios.post(
        `${currentHost}/getLists`,
        { id, type },
        { headers: { authorization: token.get() } }
    ).then(function (response) {
        const { lists, boardId } = response.data;
        dispatch(getLists(lists));
        dispatch(setBoardId(boardId));

        let newlist = lists.map((list) => list._id);
        dispatch(fetchCards(newlist));
    })
}
