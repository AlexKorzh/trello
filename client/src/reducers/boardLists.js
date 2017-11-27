import { 
    CREATE_LIST, 
    GET_BOARD_LISTS
} from '../actions/actionTypes';

export default function (state = [], action) {
    switch (action.type) {
        case GET_BOARD_LISTS: 
            return action.payload
        case CREATE_LIST: 
            return [...state, action.payload]
    }

    return state;
}

export function getListCards (state, listId) {
    return state.filter(item => item.list === listId);
}
