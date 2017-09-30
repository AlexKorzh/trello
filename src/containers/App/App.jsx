import React from 'react';
import './app.scss';
import Header from '../../components/Header';
import RegisterForm from '../../components/RegisterForm';

export default class App extends React.Component {

    testMethod () {
        return 1;
    }

    render () {
        return (
            <div className = "app-wrap">
                <Header />
                <RegisterForm /> 
            </div>
        );
    }
}
