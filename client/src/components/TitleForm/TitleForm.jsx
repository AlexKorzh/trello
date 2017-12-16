import React, { Component } from 'react';
import './titleForm.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TitleForm extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        const isOpen = this.props.show;
        
        return (
            <div ref = "form" 
                className = {`title-form ${isOpen && 'open'}`}>
                <h3 className = "title">{this.props.formTitle} 
                    <span 
                        role = "button" 
                        onClick = {this.props.close} 
                        className = "close-card close">
                        <span aria-hidden = "true">&times;</span>
                    </span>
                </h3>
                <input 
                    ref = {this.props.inputRef}
                    className = "title-name form-control" 
                    type = "text"
                    defaultValue = {this.props.pageTitle}
                    onChange = { this.handeTitleChange }
                />
                <button
                    className = "btn btn-success"
                    onClick = { this.props.changeTitle }
                >
                    {this.props.buttonTitle}
                </button>
            </div>
        );
    }
};

export default TitleForm;
