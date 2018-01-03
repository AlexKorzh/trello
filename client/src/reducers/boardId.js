import { 
    SET_BOARD_ID
} from '../constants/ActionTypes';

export default function (state = '', action) {
    switch (action.type) {
        case SET_BOARD_ID: 
            return action.id;
        default:
            return state;
    }
    return state;
}