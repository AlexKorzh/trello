import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './authentication';
import modal from './modal';
import lists from './lists';
import boardId from './boardId';
import boards from './boardReducer';
import cards from './cards';
import fetching from './fetching';
import boardTitle from './boardTitle';

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
    boardTitle
});

export default rootReducer;
