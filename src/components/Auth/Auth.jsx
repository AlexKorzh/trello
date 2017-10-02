import React, { Component } from 'react';
import SignIn from '../SignIn';

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
                        <div className="col-12 col-md-8 col-lg-4 mx-sm-auto mx-md-auto">
                            {/* <SignIn /> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
