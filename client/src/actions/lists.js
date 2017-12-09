import token from '../utils/token';
import currentHost from '../utils/host';
import axios from 'axios';
import { fetchCards } from './cards';
import {
    CREATE_LIST,
    GET_LISTS
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

export const createListMiddleware = (title, boardId) => {
    return dispatch => {
        axios.post(
            `${currentHost}/boards/createList`,
            { title, boardId },
            { headers: { authorization: token.get() } }
        ).then(response => {
            dispatch(createList(response.data.list));
        });
    }
}

export const fetchLists = (boardId) => dispatch => {
    axios.post(
        `${currentHost}/getLists`,
        { boardId },
        { headers: { authorization: token.get() } }
    ).then(function (response) {
        const lists = response.data.lists;
        dispatch(getLists(lists));

        let newlist = lists.map((list) => list._id);
        dispatch(fetchCards(newlist));
    })
}
