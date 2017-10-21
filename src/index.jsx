import React from 'react';
import { render } from 'react-dom';

import App from './containers/App/App.jsx';
import data from './database'; 
// Provider to map React and redux
import { Provider } from 'react-redux'; // get access to data in redux STORE
import { createStore } from 'redux';
import reducers from './reducers';


const store = createStore(
    reducers,
    // Configuration for redux devTools 
    window.__REDUX_DEVTOOLS_EXTENSION__ 
    && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
    <Provider store = {store}>
        <App />
    </Provider>, 
    document.getElementById('app')
);
