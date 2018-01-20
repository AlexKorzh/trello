import React, { Component } from 'react';
import './app.scss';
import reducers from '../../reducers';
import { AUTH_USER } from '../../ActionTypes';

import Welcome from '../Welcome/Welcome.jsx';
import SignIn from '../../components/SignIn/SignIn.jsx';
import SignUp from './../../components/SignUp/SignUp.jsx';
import SignOut from './../../components/SignOut/SignOut.jsx';
import requireAuth from '../../components/Auth/require_auth';
import BoardPage from '../../components/BoardPage/BoardPage.jsx';
import ListPage from '../../components/ListPage/ListPage.jsx';
import Modal from '../../components/Modal';

import history from '../../utils/history';
import { Router } from 'react-router-dom';
import { Route, Switch } from 'react-router'; 
import reduxThunk from 'redux-thunk';
// Provider to map React and redux
// get access to data in redux STORE
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(
    reducers,
    // Configuration for redux devTools 
    window.__REDUX_DEVTOOLS_EXTENSION__ 
    && window.__REDUX_DEVTOOLS_EXTENSION__() 
);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in 
if (token) {
    // we need to update application state
    store.dispatch({ type: AUTH_USER });
}

class App extends Component {
    test () {}
    render () {
        return(
            <MuiThemeProvider>
                <Provider store={store}>
                    <Router history={history}>
                        <div id = "app">
                            <Route path="/signin" component={SignIn}/>
                            <Route path="/signup" component={SignUp}/>
                            <Route path="/signout" component={SignOut}/>
                            <Route exact path = "/" component = {requireAuth(BoardPage)}/>
                            <Switch>
                                <Route path='/b/:id/:title' component={requireAuth(ListPage)}/>
                                <Route path='/c/:id/:title' component={requireAuth(ListPage)}/>
                            </Switch>
                            <Modal />
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
