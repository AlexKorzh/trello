import { 
    AUTH_USER, 
    AUTH_ERROR, 
    UNAUTH_USER, 
    FETCH_MESSAGE 
} from '../constants/ActionTypes';

export default function (state = {}, action) {
    switch (action.type) {
        case AUTH_USER: 
            return {...state, authenticated: true};
        case UNAUTH_USER:
            return {...state, authenticated: false};
        case AUTH_ERROR:
            return {...state, error: action.payload};
        case FETCH_MESSAGE: 
            return {...state, message: action.payload};    
    }
    
    return state;
}
