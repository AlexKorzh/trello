import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './authentication';
import lists from './lists';
import boards from './boardReducer';
import cards from './cards';
import fetching from './fetching';
import title from './title';

const rootReducer = combineReducers({
    // routing: routerReducer,
    form,
    auth,
    boards,
    lists,
    cards,
    fetching,
    title
});

export default rootReducer;
