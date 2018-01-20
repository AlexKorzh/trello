import { 
    GET_BOARDS,
    CREATE_BOARD, 
    DELETE_BOARD,
    UPDATE_BOARD
} from '../ActionTypes';

export default function (state = [], action) {
    switch (action.type) {
        case GET_BOARDS: 
            return action.payload;
        case CREATE_BOARD:
            return [...state, action.payload];
        case UPDATE_BOARD:
            return state.map(board => board._id === action.payload._id ? action.payload : board)
        case DELETE_BOARD: 
            const id = action.payload;
            
            return [...state.filter(board => board._id != id)]
        default:
            return state;
    }
}
