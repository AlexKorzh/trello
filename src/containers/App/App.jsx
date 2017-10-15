import React from 'react';
import './app.scss';
import Header from '../../components/Header';

import RegisterForm from '../../components/RegisterForm';
import Auth from '../../components/Auth';
import BoardPage from '../../components/BoardPage';

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

        // return(
        //     <div className = "app-wrap">
        //         <Header />
        //         <Auth />
        //         <RegisterForm /> 
        //     </div>
        // );
    }
}
