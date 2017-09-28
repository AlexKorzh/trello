import React from 'react';

import './app.scss';
import Header from '../../components/Header';

export default class App extends React.Component {

    testMethod () {
        return 1;
    }

    render () {
        return <Header />;
    }
}
