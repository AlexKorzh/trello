import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './authentication';
import boardLists from './boardLists';
import boards from './boardReducer';

const rootReducer = combineReducers({
    // routing: routerReducer,
    form,
    auth,
    boardLists,
    boards
});

export default rootReducer;
