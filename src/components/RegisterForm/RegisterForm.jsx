import React, { Component } from 'react';
import './registerForm.scss';
import userEnter from '../../actions/registerUser';
import { connect } from 'react-redux';

class RegisterForm extends Component {
    constructor (props) {
        super(props);
        this.isValid = false;
        this.registerHandle = this.registerHandle.bind(this);
        this.fieldValidation = this.filedValidation.bind(this);
        this.fields = [];
        
    }
    registerHandle (event) {
        event.preventDefault();
        this.valid = this.filedValidation(this.fields);

        if (this.valid) {debugger
            let user = {};
            this.fields.forEach((field) => {
                field.classList.remove('error');
                user[field.name] = field.value;
            });
            this.props.onEnter(user);
        } else {
            this.fields.forEach((field) => field.classList.add('error'));
        }
    }
    filedValidation (fields) {
        this.valid = fields.every((field) => {
            if (field.value !== '') return true;
        });
    
        return this.valid;
    }
    render () {
        return (
            <div className="register-container">
                <div className="form-group form-group-custom">
                    <input
                        ref = {(input) => this.fields.push(input)}
                        type="text"
                        name="name"
                        className="form-control form-control-lg"
                        placeholder="Your Name" 
                    />
                </div>
                <div className="form-group form-group-custom">
                    <input
                        ref =  {(input) => this.fields.push(input)}
                        type="email"
                        name="email"
                        className="form-control form-control-lg"
                        placeholder="Email Address" 
                    />
                </div>
                <div className="form-group form-group-custom">
                    <input 
                        ref = {(input) => this.fields.push(input)}
                        type="password" 
                        name="password"
                        className="form-control form-control-lg"
                        placeholder="Password" 
                    />
                </div>
                <div className="form-group form-group-custom">
                    <input
                        ref = {(input) => this.fields.push(input)}
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

function mapStateToProps (state) {
    return {
        users: state
    };
}

function mapDispatchToProps (dispatch) {
    return {
        onEnter: user => dispatch(userEnter(user))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
