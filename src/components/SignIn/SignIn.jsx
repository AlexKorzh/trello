import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SignInDefault from './SignInDefault';
import SignInSocial from './SignInSocial';

import './signin.scss';

export default class SignIn extends Component {
    constructor () {
        super();

        this.state = {
            socialMediaLogin: false
        };

        this.changeLoginType = this.changeLoginType.bind(this);
    }

    changeLoginType (e) {
        e.preventDefault();

        const socialMediaLogin = this.state.socialMediaLogin;

        this.setState({
            socialMediaLogin: !socialMediaLogin
        });
    }

    render () {
        const socialMediaLogin = this.state.socialMediaLogin;

        return(
            <div className="signin-container">
                {socialMediaLogin ?
                    <SignInSocial 
                        changeLoginType={this.changeLoginType} 
                    /> :
                    <SignInDefault 
                        changeLoginType={this.changeLoginType}
                    />
                }
            </div>
        );
    }
}

SignIn.propTypes = {
    // register:  PropTypes.func.isRequired
};
