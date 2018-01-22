import { 
    UPDATE_TITLE,
    GET_TITLE
} from '../actionTypes';

export default function (state = '', action) {
    switch (action.type) {
        case UPDATE_TITLE: 
            return action.payload;
        case GET_TITLE: 
            return action.payload;
        default:
            return state;
    }
    return state;
}
