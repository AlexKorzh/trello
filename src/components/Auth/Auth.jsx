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
            <div className="container">
                <div className="row">
                    <div className="col-3 mx-auto">
                        <div className="auth-container">
                            test
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
