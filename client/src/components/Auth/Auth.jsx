import React, { Component } from 'react';

import './auth.scss';

import SignIn from './SignIn/SignIn.jsx';
import RegisterFrom from './RegisterForm/RegisterForm.jsx';

export default class Auth extends Component {
    constructor () {
        super();

        this.state = { mode: 'login', title: 'Sign In' };
        this.showLoginForm = this.showLoginForm.bind(this);
        this.showRegisterForm = this.showRegisterForm.bind(this);
    }

    componentDidMount () {
        document.body.classList.add('auth-page');
    }

    componentWillUnmount () {
        document.body.classList.remove('auth-page')
    }

    showLoginForm () {
        this.setState({ mode: 'login', title: 'Sign In' });
    }

    showRegisterForm () {
        this.setState({ mode: 'register', title: 'Register' });
    }

    render () {
        const mode = this.state.mode;

        let modes = {
            login: () => <SignIn />,
            register: () => <RegisterFrom />
        };

        let form = modes[mode]();

        return (
            <div className="row overlay align-items-center">
                <div className="col-md-3 mx-sm-auto ">
                    <div className="auth-container align-items-center">
                        <h2>{this.state.title}</h2>
                        <div className="auth-form">
                            <div className="form-group auth-form-fieldset">
                                {form}
                                <hr className="colorgraph" />
                                <ul className="nav nav-pills nav-pills-custom nav-justified">
                                    <li className="nav-item">
                                        <a
                                            role="button"
                                            className={`nav-link ${mode == 'login' && "active"}`}
                                            onClick={this.showLoginForm}>
                                            Sign in
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            role="button"
                                            className={`nav-link ${mode == 'register' && "active"}`}
                                            onClick={this.showRegisterForm}>
                                            Register
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
