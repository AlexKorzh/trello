import { 
    CREATE_LIST, 
    GET_LISTS,
    UPDATE_LIST,
    DELETE_LIST
} from '../actionTypes';

export default function (state = [], action) {
    switch (action.type) {
        case GET_LISTS: 
            return action.payload
        case CREATE_LIST: 
            return [...state, action.payload]
        case UPDATE_LIST:
            return state.map(list => list._id === action.payload._id ? action.payload : list)
        case DELETE_LIST: 
            const id = action.payload;
            
            return [...state.filter(list => list._id != id)]
        
    }
    return state;
}

export function getCards (state, listId) {
    return state.filter(item => item.list === listId);
}
