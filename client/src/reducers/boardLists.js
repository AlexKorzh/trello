import { 
    CREATE_LIST, 
    GET_BOARD_LISTS,
    DELETE_BOARD
} from '../actions/actionTypes';

export default function (state = [], action) {
    switch (action.type) {
        case GET_BOARD_LISTS: 
            return action.payload
        case CREATE_LIST: 
            return [...state, action.payload]
        case DELETE_BOARD: 
            return [...state, action.payload]    
    }
    return state;
}
