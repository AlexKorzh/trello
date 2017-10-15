import React from 'react';
import { render } from 'react-dom';
import './main.scss';
import App from './containers/App';
import data from './database'; 
// Provider to map React and redux
import { Provider } from 'react-redux'; // get access to data in redux STORE
import { createStore } from 'redux';
import reducer from './reducer';


const store = createStore(
    reducer,
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
