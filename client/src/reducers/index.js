import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './authentication';
import modal from './modal';
import lists from './lists';
import boardId from './boardId';
import boards from './boardReducer';
import cards from './cards';
import fetching from './fetching';
import title from './title';

const rootReducer = combineReducers({
    // routing: routerReducer,
    form,
    auth,
    modal,
    boardId,
    boards,
    lists,
    cards,
    fetching,
    title
});

export default rootReducer;
