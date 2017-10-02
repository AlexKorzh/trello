import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SignInDefault from './SignInDefault';
import SignInSocial from './SignInSocial';

import './signin.scss';

export default class SignIn extends Component {
    constructor (props) {
        super(props);

        this.state = {
            socialMediaLogin: false
        };

        this.changeLoginType = this.changeLoginType.bind(this);
    }

    changeLoginType (e) {
        e.preventDefault();

        const socialMediaLogin = this.state.socialMediaLogin;

        this.setState({
            socialMediaLogin: socialMediaLogin ? false : true
        });
    }

    render () {
        const socialMediaLogin = this.state.socialMediaLogin;

        return(
            <div className="auth-signin">
                <h2>Sign In</h2>
                <form className="auth-form">
                    {socialMediaLogin ?
                        <SignInDefault 
                            changeLoginType={this.changeLoginType} 
                        /> :
                        <SignInSocial 
                            changeLoginType={this.changeLoginType} 
                        />
                    }
                </form>
            </div>
        );
    }
}
