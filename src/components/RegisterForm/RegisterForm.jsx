import React, { Component } from 'react';
import './registerForm.scss';
import userEnter from '../../actions/registerUser';
import { connect } from 'react-redux';

class RegisterForm extends Component {
    constructor (props) {
        super(props);
        this.isValid = false;
        this.registerHandle = this.registerHandle.bind(this);
        this.fields = [];
        
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
