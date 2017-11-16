import React, { Component } from 'react';
import './app.scss';
import reducers from '../../reducers';
import { AUTH_USER } from '../../actions/types';

import Welcome from '../Welcome/Welcome.jsx';
import SignIn from '../../components/SignIn/SignIn.jsx';
import SignUp from './../../components/SignUp/SignUp.jsx';
import SignOut from './../../components/SignOut/SignOut.jsx';
import requireAuth from '../../components/Auth/require_auth';
import BoardPage from '../../components/BoardPage/BoardPage.jsx';

import history from './history';
import { Router } from 'react-router-dom';
import { Route } from 'react-router'; 
import reduxThunk from 'redux-thunk';
// Provider to map React and redux
// get access to data in redux STORE
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(
    reducers,
    // Configuration for redux devTools 
    window.__REDUX_DEVTOOLS_EXTENSION__ 
    && window.__REDUX_DEVTOOLS_EXTENSION__() 
);

console.log('store --->' ,store.getState());

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in 
if (token) {
    // we need to update application state
    store.dispatch({ type: AUTH_USER });
}

class App extends Component {
    test () {
        
    }
    render () {
        return(
            <Provider store={store}>
                <Router history={history}>
                    <div id = "app">
                        <Route exact = {true} path="/" component={Welcome}/>
                        <Route path="/signin" component={SignIn}/>
                        <Route path="/signup" component={SignUp}/>
                        <Route path="/signout" component={SignOut}/>
                        <Route path = "/boards" component = {requireAuth(BoardPage)}/> 
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
