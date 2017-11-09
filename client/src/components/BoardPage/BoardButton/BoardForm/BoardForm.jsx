import React, { Component } from 'react';
import { connect } from 'react-redux';

import './boardForm.scss';

class BoardForm extends Component {
    constructor () {
        super();
        
        this.createBoard = this.createBoard.bind(this);
    }

    createBoard () {
        console.log('::Creat Board::');
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
                />
                <button
                    className = "btn btn-success"
                    onClick = { this.createBoard }
                >
                    Созадть
                </button>
            </div>
        );
    }
};

export default connect(
    (state, ownProps) => {
        console.log('::state ', state); // state
        console.log('::ownProps ', ownProps); // ownProps
    }
)(BoardForm);
