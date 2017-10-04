import React, { Component } from 'react';
import PropTypes from 'prop-types';

const SignInDefault = ({ changeLoginType, register}) => {
    return(
        <fieldset className="form-group auth-form-fieldset">
            <button 
                className="btn btn-lg btn-block btn-outline-primary btn-social-login"
                onClick={changeLoginType}
            >
                <i
                    className="fa fa-user-o" 
                    aria-hidden="true"
                />
                Log in with social media
            </button>
            <hr className="colorgraph" />
            <div className="form-group form-group-custom">
                <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address" 
                />
            </div>
            <div className="form-group form-group-custom">
                <input 
                    type="password" 
                    name="password"
                    className="form-control form-control-lg"
                    placeholder="Password" 
                />
            </div>
            <button className="btn btn-lg btn-enter btn-block">
                Enter
            </button>
            <hr className="colorgraph" />
            <ul className="nav nav-pills nav-pills-custom nav-justified">
                <li className="nav-item">
                    <a className="nav-link active" href="#">
                        Sign in
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link"
                        onClick = {register} 
                        href="#">Register</a>
                </li>
            </ul>
        </fieldset>
    );
};

SignInDefault.propTypes = {
    changeLoginType: PropTypes.func.isRequired,
    register:  PropTypes.func.isRequired
};

export default SignInDefault;
