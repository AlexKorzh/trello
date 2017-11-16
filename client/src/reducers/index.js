import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './authentication';
import listReducer from './listReducer';
import boards from './boardReducer';

const rootReducer = combineReducers({
    // routing: routerReducer,
    form,
    auth,
    listReducer,
    boards
});

export default rootReducer;
