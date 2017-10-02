import React, { Component } from 'react';
import PropTypes from 'prop-types';

const SignInSocial = ({changeLoginType}) => (
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
        <button className="btn btn-lg btn-block btn-outline-primary btn-go-back" onClick={changeLoginType}>
            Go back
        </button>
        <hr className="colorgraph" />
        <ul className="nav nav-pills nav-pills-custom nav-justified">
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
);

SignInSocial.propTypes = {
    changeLoginType: PropTypes.func.isRequired
};

export default SignInSocial;
