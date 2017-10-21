import React, { Component } from 'react';
import SignIn from '../SignIn/SignIn.jsx';
import RegisterFrom from '../RegisterForm';
import './auth.scss';

export default class Auth extends Component {
    constructor () {
        super();
        this.state = {mode: 'logIn', title: 'Sign In'};
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
        this.setState({mode: 'logIn', title: 'Sign In'});
    }

    showRegisterForm () {
        this.setState({mode: 'register', title: 'Register'});
    }

    render () {
        let form;
        const loginMode = this.state.mode === 'logIn';
        const registerMode = this.state.mode === 'register';

        if (loginMode) {
            form = <SignIn />
        } else if (registerMode) {
            form = <RegisterFrom />
        }

        return(
            <div className="auth-container-overlay">
                <div className="container h-100">
                    <div className="row h-100 justify-content-center align-items-center">
                        <div className="col-12 col-md-8 col-lg-4 mx-sm-auto mx-md-auto">
                            <div className="auth-container">
                                <h2>{ this.state.title }</h2>
                                <form className="auth-form">
                                    <fieldset className="form-group auth-form-fieldset">
                                        { form }
                                        <hr className="colorgraph" />
                                        <ul className="nav nav-pills nav-pills-custom nav-justified">
                                            <li className="nav-item">
                                                <a 
                                                    role="button" 
                                                    className={`nav-link ${loginMode && "active"}`} 
                                                    onClick={this.showLoginForm}>
                                                    Sign in
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a 
                                                    role="button" 
                                                    className={`nav-link ${registerMode && "active"}`} 
                                                    onClick={this.showRegisterForm}
                                                >Register</a>
                                            </li>
                                        </ul>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
