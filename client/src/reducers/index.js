import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './authentication';
import lists from './boardLists';
import boards from './boardReducer';
import cards from './cards';

const rootReducer = combineReducers({
    // routing: routerReducer,
    form,
    auth,
    lists,
    boards,
    cards
});

export default rootReducer;
