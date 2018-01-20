import React, { Component } from 'react';
import './signin.scss';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
import * as actions from '../../actions/users';
import { Link } from 'react-router-dom';

const inputField = field => {
    const { input, type, placeholder } = field;
    return (
        <input {...input} type={type} 
            className="form-control form-control-lg"
            placeholder = {placeholder}
        />
    );
};

class Signin extends Component {
    constructor () {
        super();
    }
    
    handleFormSubmit ({ email, password }) {
        this.props.signinUser(email, password);
    }

    renderAlert () {
        const { errorMessage } = this.props;
        
        if (errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops! </strong>{errorMessage}
                </div>
            );
        }
    }

    render () {
        const { handleSubmit } = this.props;

        return (
            <div className="overlay">
                <div className="col-md-6 mx-sm-auto auth-form">
                    <div className="signin-container signin-default-container">
                        <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                            <div className="form-group form-group-custom">
                                <Field name="email"
                                    type="email"
                                    component={inputField}
                                    placeholder = "email" />
                            </div>
                            <div className="form-group form-group-custom">
                                <Field name="password"
                                    type="password"
                                    component={inputField}
                                    placeholder = "password" />
                            </div>
                            {this.renderAlert()}
                            <button action="submit" 
                                className="btn btn-success btn-lg btn-enter btn-bloc">
                                Sign in
                            </button>
                            <Link to = "/signup" className = "form-link">Sign Up</Link>
                        </Form>
                    </div>
                </div>
            </div>        
        );
    }
}

function mapStateToProps (state) {
    return { 
        errorMessage: state.auth.error
    };
}

Signin = reduxForm({
    form: 'signin'
})(Signin);

export default connect(mapStateToProps, actions)(Signin);
