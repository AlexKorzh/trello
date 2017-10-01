import React from 'react';
import './app.scss';
import Header from '../../components/Header';

import RegisterForm from '../../components/RegisterForm';
import Auth from '../../components/Auth';

export default class App extends React.Component {

    testMethod () {
        return 1;
    }

    render () {
        return(
            
            <Auth />
            
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
