import React, { Component } from 'react';

import './signin.scss';

export default class SignIn extends Component {
    test () {

    }
    render () {
        return(
            <div className="auth-signin">
                <h2>Sign In</h2>
                <form className="auth-form">
                    <fieldset className="form-group auth-form-fieldset">
                        <button className="btn btn-lg btn-block btn-google-plus">
                            <i
                                className="fa fa-google-plus" 
                                aria-hidden="true"
                            />
                            Google
                        </button>
                        <button className="btn btn-lg btn-block btn-facebook">
                            <i
                                className="fa fa-facebook" 
                                aria-hidden="true" 
                            />
                            Facebook
                        </button>
                        <button className="btn btn-lg btn-block btn-twitter">
                            <i
                                className="fa fa-twitter" 
                                aria-hidden="true" 
                            />
                            Twitter
                        </button>
                        <button className="btn btn-lg btn-block btn-linkedin">
                            <i 
                                className="fa fa-linkedin" 
                                aria-hidden="true"
                            />
                            Linkedin
                        </button>
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
                        <button className="btn btn-lg btn-success btn-block">
                            Enter
                        </button>
                        <hr className="colorgraph" />
                        <ul className="nav nav-pills nav-justified">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">
                                    Sign in
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Register</a>
                            </li>
                        </ul>
                    </fieldset>
                </form>
            </div>
        );
    }
}
