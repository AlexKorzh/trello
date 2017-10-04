import React, { Component } from 'react';
import PropTypes from 'prop-types';

const SignInDefault = ({ changeLoginType }) => {
    return(
        <div className="signin-default-container">
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
        </div>
    );
};

SignInDefault.propTypes = {
    changeLoginType: PropTypes.func.isRequired
};

export default SignInDefault;
