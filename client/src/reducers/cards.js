import { 
    CREATE_CARD,
    GET_CARD_LISTS
} from '../actions/actionTypes';

export default function (state = [], action) {
    switch (action.type) {
        case GET_CARD_LISTS: 
            return action.payload;
        case CREATE_CARD: 
            return [...state, action.payload]
        default:
            return state;
    }
    return state;
}
