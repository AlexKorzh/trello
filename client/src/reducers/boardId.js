import { 
    SET_BOARD_ID
} from '../actionTypes';

export default function (state = '', action) {
    switch (action.type) {
        case SET_BOARD_ID: 
            return action.id;
        default:
            return state;
    }
    return state;
}
