import React from 'react';
import './app.scss';
import Header from '../../components/Header/Header.jsx';

import RegisterForm from '../../components/RegisterForm/RegisterForm.jsx';
import Auth from '../../components/Auth/Auth.jsx';
import BoardPage from '../../components/BoardPage/BoardPage.jsx';

export default class App extends React.Component {
    testMethod () {
        return 1;
    }

    render () {
        return(
            <div>
                {/* <Header /> */}
                <Auth />
                {/* <BoardPage /> */}
            </div>
        );
    }
}
