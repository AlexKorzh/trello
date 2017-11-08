import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
// import { routerReducer } from 'react-router-redux';

import auth from './authentication';

const rootReducer = combineReducers({
    // routing: routerReducer,
    form: form,
    auth: auth
});

export default rootReducer;
