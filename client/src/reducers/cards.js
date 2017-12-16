import { 
    CREATE_CARD,
    GET_CARDS,
    UPDATE_CARD_TITLE
} from '../constants/ActionTypes';

export default function (state = [], action) {
    switch (action.type) {
        case GET_CARDS: 
            return action.payload;
        case CREATE_CARD: 
            return [...state, action.payload];
        case UPDATE_CARD_TITLE:
            return state.map(card => card._id === action.payload._id ? action.payload : card)
        default:
            return state;
    }
    return state;
}
