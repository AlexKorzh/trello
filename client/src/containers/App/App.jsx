import React, { Component } from 'react';
import './app.scss';
import reducers from '../../reducers';
import { AUTH_USER } from '../../actions/types';

import Welcome from '../Welcome/Welcome.jsx';
import SignIn from '../../components/SignIn/SignIn.jsx';
import SignUp from './../../components/SignUp/SignUp.jsx';

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

class App extends Component {
    test () {
        
    }
    render () {
        return(
            <Provider store={store}>
                <Router history={history}>
                    <div id = "app">
                        <Route exact path="/" component={Welcome}/>
                        <Route path="/signin" component={SignIn}/>
                        <Route path="/signup" component={SignUp}/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
