import database from '../database';

const initialSate = database.users;

export default function users (state = initialSate, action) {
    if (action.type === 'REGISTER_USER') {
        return [
            ...state,
            action.user
        ];
    }
    
    return state;
}


