import { 
    CREATE_LIST, 
    GET_LISTS
} from '../constants/ActionTypes';

export default function (state = [], action) {
    switch (action.type) {
        case GET_LISTS: 
            return action.payload
        case CREATE_LIST: 
            return [...state, action.payload]
    }

    return state;
}

export function getCards (state, listId) {
    return state.filter(item => item.list === listId);
}
