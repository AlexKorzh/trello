import { 
    CREATE_CARD,
    GET_CARDS,
    UPDATE_CARD_TITLE,
    DELETE_CARD,
    START_FILE_UPLOADING,
    END_FILE_UPLOADING,

    ADD_COMMENT, 
    UPDATE_COMMENT,
    DELETE_COMMENT
} from '../ActionTypes';

const updateCardState = (state, action) => state.map(card => { 
    return card._id === action.payload._id ? action.payload : card
});

export default function (state = [], action) {
    switch (action.type) {
        case GET_CARDS: 
            return action.payload;
        case CREATE_CARD: 
            return [...state, action.payload];
        case DELETE_CARD: 
            const id = action.payload;
            
            return [...state.filter(card => card._id != id)]
        case START_FILE_UPLOADING:
            return [...state, action.payload];
        case END_FILE_UPLOADING:
            const last = state.length - 1;
            const output = state.slice();

            output[last] = action.payload;

            return output;
        case UPDATE_CARD_TITLE:
            return updateCardState(state, action);
        case ADD_COMMENT:
            return updateCardState(state, action);
        case UPDATE_COMMENT:
            return updateCardState(state, action);
        case DELETE_COMMENT:
            return updateCardState(state, action);    
        default:
            return state;
    }
    return state;
}
