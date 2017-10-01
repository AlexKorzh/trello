import React, { Component } from 'react';

import './auth.scss';

export default class Auth extends Component {
    componentDidMount () {
        document.body.classList.add('auth-page');
    }

    componentWillUnmount () {
        document.body.classList.remove('auth-page')
    }

    render () {
        return(
            <div className="auth-container-overlay">
                <div className="container h-100">
                    <div className="row h-100 justify-content-center align-items-center">
                        <div className="col-12 col-md-8 col-lg-6 mx-sm-auto mx-md-auto">
                            <h2>Sign In</h2>
                            <form className="auth-form">
                                <fieldset className="form-group auth-form-fieldset">
                                    <hr className="colorgraph" />
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control form-control-lg"
                                            placeholder="Email Address" 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="password" 
                                            name="password"
                                            className="form-control form-control-lg"
                                            placeholder="Password" 
                                        />
                                    </div>
                                    <div className="button-checkbox">
                                        <button type="button" className="btn btn-info active" data-color="info">
                                            Remember Me
                                            <i className="fa fa-check-square-o" aria-hidden="true" />
                                        </button>
                                        <input
                                            className="hidden"
                                            type="checkbox" 
                                            name="remember_me" 
                                            id="remember_me"
                                        />
                                    </div>
                                    <hr className="colorgraph" />
                                    <div className="row">
                                        <div className="col-6 col-md-6 col-lg-6">
                                            <button className="btn btn-lg btn-success btn-block">Sign In</button>
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-6">
                                            <button className="btn btn-lg btn-primary btn-block">Register</button>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
