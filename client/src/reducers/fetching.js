import { 
    START_FETCHING,
    END_FETCHING
} from '../constants/ActionTypes';

export default function (state = false, action) {
    switch (action.type) {
        case START_FETCHING: 
            return true;
        case END_FETCHING: 
            return false;
        default:
            return state;
    }
    return state;
}
