import { 
    GET_USER_BOARDS
} from '../actions/types';

export default function (state = [], action) {
    console.log('actions', action)
    switch (action.type) {
        case GET_USER_BOARDS: 
            return action.payload;
        default:
            return state;
    }
}
