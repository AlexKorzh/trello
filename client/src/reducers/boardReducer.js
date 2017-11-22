import { 
    GET_USER_BOARDS, CREATE_BOARD
} from '../actions/actionTypes';

export default function (state = [], action) {
    console.log('actions', action)
    switch (action.type) {
        case GET_USER_BOARDS: 
            return action.payload;
        case CREATE_BOARD:
            return [...state, action.payload];
        default:
            return state;
    }
}
