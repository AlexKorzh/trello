import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SignInDefault extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return(
            <div className="signin-default-container">
                <button
                    className="btn btn-lg btn-block btn-outline-primary btn-social-login"
                    onClick={this.props.changeLoginType}
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
                        ref = "emailField"
                        type="email"
                        name="email"
                        className="form-control form-control-lg"
                        placeholder="Email Address" 
                    />
                </div>
                <div className="form-group form-group-custom">
                    <input 
                        ref = "passwordField"
                        type="password" 
                        name="password"
                        className="form-control form-control-lg"
                        placeholder="Password" 
                    />
                </div>
                <button className="btn btn-lg btn-enter btn-block">Enter</button>
            </div>
        );
    }
};

SignInDefault.propTypes = {
    changeLoginType: PropTypes.func.isRequired
};

export default SignInDefault;
