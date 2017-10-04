import React, { Component } from 'react';
import SignIn from '../SignIn';
import RegisterFrom from '../RegisterForm';
import './auth.scss';

export default class Auth extends Component {
    constructor () {
        super();
        this.state = {mode: 'logIn'};
        this.showRegisterForm = this.showRegisterForm.bind(this);
    }

    componentDidMount () {
        document.body.classList.add('auth-page');
    }

    componentWillUnmount () {
        document.body.classList.remove('auth-page')
    }

    showRegisterForm () {
        this.setState({mode: 'register'});
    }

    render () {
        let form = {};

        if (this.state.mode === 'logIn') {
            form = <SignIn register = {this.showRegisterForm}/>
        } else if (this.state.mode === 'register') {
            form = <RegisterFrom />
        }

        return(
            <div className="auth-container-overlay">
                <div className="container h-100">
                    <div className="row h-100 justify-content-center align-items-center">
                        <div className="col-12 col-md-8 col-lg-4 mx-sm-auto mx-md-auto">
                            { form }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
