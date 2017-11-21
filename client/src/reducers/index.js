import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './authentication';
import lists from './boardLists';
import boards from './boardReducer';

const rootReducer = combineReducers({
    // routing: routerReducer,
    form,
    auth,
    lists,
    boards
});

export default rootReducer;
