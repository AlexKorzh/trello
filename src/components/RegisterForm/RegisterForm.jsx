import React from 'react';
import './registerForm.scss';

const RegisterForm = () => {
    return (
        <div className="form-wrap auth-signin">
            <h2>Register</h2>
            <form className="auth-form">
                <fieldset className="form-group auth-form-fieldset">
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
                    <hr className="colorgraph" />
                    <ul className="nav nav-pills nav-justified">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                Sign in
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"
                                href="#">Register</a>
                        </li>
                    </ul>
                </fieldset>
            </form>
        </div>
    );
};

export default RegisterForm;
