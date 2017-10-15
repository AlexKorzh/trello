import { combineReducers } from 'redux';
import users  from './reducers/users';
import test  from './reducers/test';
// Function that combine all reducers in app
export default combineReducers({
    users,
    test
});
