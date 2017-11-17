import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { createBoard } from '../../../../actions';

import './boardForm.scss';

class BoardForm extends Component {
    constructor () {
        super();

        this.state = {
            title: ''
        };
        
        this.handeTitleChange = this.handeTitleChange.bind(this);
        this.handleCreateBoard = this.handleCreateBoard.bind(this);
    }

    handleCreateBoard () {
        const title = '';

        this.props.onCreateBoard(this.state.title);
        this.props.close();

        this.setState({title});
    }

    handeTitleChange (e) {
        const title = e.target.value;

        this.setState({title});
    }
    
    render () {
        const isOpen = this.props.show;
        
        return (
            <div ref = "form" 
                className = {`board-form card ${isOpen && 'open'}`}>
                <h3 className = "title">Создание доски 
                    <span 
                        role = "button" 
                        onClick = {this.props.close} 
                        className = "close-card close">
                        <span aria-hidden = "true">&times;</span>
                    </span>
                </h3>
                <input 
                    className = "board-name form-control" 
                    type = "text"
                    placeholder = "Например, «Издание календаря»…"
                    value = { this.state.title }
                    onChange = { this.handeTitleChange }
                />
                <button
                    className = "btn btn-success"
                    onClick = { this.handleCreateBoard }
                >
                    Созадть
                </button>
            </div>
        );
    }
};

BoardForm.propTypes = {
    onCreateBoard: PropTypes.func,
    show: PropTypes.boolean,
    close: PropTypes.func
};

export default connect(
    (state, ownProps) => {

    },
    dispatch => ({
        onCreateBoard: title => {
            dispatch(createBoard(title));
        }
    })
)(BoardForm);
