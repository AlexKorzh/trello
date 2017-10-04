import React from 'react';
import './registerForm.scss';

const RegisterForm = () => {
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
            <button className="btn btn-lg btn-enter btn-block">
                Send
            </button>
        </div>
    );
};

export default RegisterForm;
