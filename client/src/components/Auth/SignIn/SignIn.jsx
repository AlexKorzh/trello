import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
import * as actions from '../../../actions';

import './signin.scss';

const renderInput = field => {
    const { input, type, placeholder } = field;
    return (
        <input {...input} type={type} 
            className="form-control form-control-lg"
            placeholder = {placeholder} 
        />
    );
}

class Signin extends Component {
    handleFormSubmit ({ email, password }) {
        console.log(email, password);

        this.props.signinUser({ email, password });
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    renderAlert () {
        const { errorMessage } = this.props;
        if (errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong>{errorMessage}
                </div>
            );
        }
    }

    render () {
        const { handleSubmit } = this.props;
        return (
            <div className="signin-container signin-default-container">
                <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <div className="form-group form-group-custom">
                        <Field name="email"
                            type="email"
                            component={renderInput}
                            placeholder = "email" />
                    </div>
                    <div className="form-group form-group-custom">
                        <Field name="password"
                            type="password"
                            component={renderInput}
                            placeholder = "password" />
                    </div>
                    {this.renderAlert()}
                    <button action="submit" className="btn btn-lg btn-enter btn-bloc">Sign in</button>
                </Form>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return { 
        // form: state.form,
        errorMessage: state.auth.error
    };
}

Signin = reduxForm({
    form: 'signin'
})(Signin);

export default connect(mapStateToProps, actions)(Signin);
