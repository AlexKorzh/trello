import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './authentication';
import listReducer from './listReducer';

const rootReducer = combineReducers({
    // routing: routerReducer,
    form: form,
    auth: auth,
    listReducer: listReducer
});

export default rootReducer;
