import { 
    CREATE_CARD,
    GET_CARDS
} from '../constants/ActionTypes';

export default function (state = [], action) {
    switch (action.type) {
        case GET_CARDS: 
            return action.payload;
        case CREATE_CARD: 
            return [...state, action.payload]
        default:
            return state;
    }
    return state;
}
