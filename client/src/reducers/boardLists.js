import { 
    CREATE_LIST, 
    GET_BOARD_LISTS
} from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case GET_BOARD_LISTS: 
            return action.payload
        case CREATE_LIST: 
            return [...state, action.payload]
    }
    return state;
}
