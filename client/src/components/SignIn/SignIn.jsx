import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
import * as actions from '../../actions';
import './signin.scss';

class Signin extends Component {
    handleFormSubmit ({ email, password }) {
        this.props.signinUser({ email, password });
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

        const iput = field => {
            const { input, type, placeholder } = field;
            return (
                <input {...input} type={type} 
                    className="form-control form-control-lg"
                    placeholder = {placeholder} 
                />
            );
        };

        return (
            <div className="row overlay align-items-center">
                <div className="col-md-3 mx-sm-auto auth-form">
                    <div className="signin-container signin-default-container">
                        <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                            <div className="form-group form-group-custom">
                                <Field name="email"
                                    type="email"
                                    component={iput}
                                    placeholder = "email" />
                            </div>
                            <div className="form-group form-group-custom">
                                <Field name="password"
                                    type="password"
                                    component={iput}
                                    placeholder = "password" />
                            </div>
                            {this.renderAlert()}
                            <button action="submit" 
                                className="btn btn-lg btn-enter btn-bloc">
                                Sign in
                            </button>
                        </Form>
                    </div>
                </div>
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
