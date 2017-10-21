import React, { Component } from 'react';
import './registerForm.scss';

class RegisterForm extends Component {
    constructor () {
        super();

        this.registerHandle = this.registerHandle.bind(this);
    }
    registerHandle (event) {
        event.preventDefault();
        console.log(event);
    }
    render () {
        return (
            <div className="register-container">
                <div className="form-group form-group-custom">
                    <input
                        type="text"
                        name="name"
                        className="form-control form-control-lg"
                        placeholder="Your Name" 
                    />
                </div>
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
                <div className="form-group form-group-custom">
                    <input
                        type="password" 
                        name="password"
                        className="form-control form-control-lg"
                        placeholder="Confirm Password" 
                    />
                </div>
                <button 
                    className="btn btn-lg btn-enter btn-block"
                    onClick = {this.registerHandle}>
                    Send
                </button>
            </div>
        );
    }
};

export default RegisterForm;
