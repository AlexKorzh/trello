import { 
    CREATE_LIST
} from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
    case CREATE_LIST: 
        return [
            ...state, 
            action.title
        ]
    }
    return state;
}
