import React from 'react';
import './registerForm.scss';

const RegisterForm = () => {
    return (
        <div className="form-wrap">
            <form action = "#" method = "POST">
                <div className = "form-group">
                    <input type = "text"  className = "form-control" placeholder = "Enter your name"/>
                </div>
                <div className = "form-group">
                    <input type = "email"  className = "form-control" placeholder = "Enter youre email"/>
                </div>
                <div className = "form-group">
                    <input type = "password"  className = "form-control" placeholder = "Enter youre password"/>
                </div>
                <button className = "btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default RegisterForm;
