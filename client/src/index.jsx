import React from 'react';
import { render } from 'react-dom';
import App from './containers/App/App.jsx';
// import Welcome from './containers/Welcome/Welcome.jsx';

// Provider to map React and redux
// get access to data in redux STORE
import { Provider } from 'react-redux'; 

import { createStore, applyMiddleware } from 'redux';
import { 
    BrowserRouter, 
    Route, 
    IndexRoute, 
    browserHistory 
} from 'react-router-dom';

import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/types';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(
    reducers,
    // Configuration for redux devTools 
    window.__REDUX_DEVTOOLS_EXTENSION__ 
    && window.__REDUX_DEVTOOLS_EXTENSION__() 
);


render(
    <Provider store={store}>
        <BrowserRouter history={browserHistory}>
            <Route path="/" component={App}>
                {/* <IndexRoute component = {Welcome}/> */}
                {/* <Route path="signin" component = {Signin}/>
                <Route path = "signout" component = {SignOut}/>
                <Route path = "signup" component = {Signup}/>
                <Route path = "feature" component = {RequireAuth(Feature)}/> */}
            </Route>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('app')
);
