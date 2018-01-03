import { 
    CREATE_CARD,
    GET_CARDS,
    UPDATE_CARD_TITLE,
    START_FILE_UPLOADING,
    END_FILE_UPLOADING
} from '../constants/ActionTypes';

export default function (state = [], action) {
    switch (action.type) {
        case GET_CARDS: 
            return action.payload;
        case CREATE_CARD: 
            return [...state, action.payload];
        case START_FILE_UPLOADING:
            return [...state, action.payload];
        case END_FILE_UPLOADING:
            const last = state.length - 1;
            const output = state.slice();

            output[last] = action.payload;

            return output;
        case UPDATE_CARD_TITLE:
            return state.map(card => card._id === action.payload._id ? action.payload : card)
        default:
            return state;
    }
    return state;
}
