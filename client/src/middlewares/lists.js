import token from '../utils/token';
import currentHost from '../utils/host';
import axios from 'axios';
import { fetchCards } from './cards';

import { 
    createList,
    getLists,
    updateList,
    deleteList,
    setBoardId
} from '../actionCreators/lists';

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
