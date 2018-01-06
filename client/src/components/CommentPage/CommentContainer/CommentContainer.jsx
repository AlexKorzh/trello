import React, { Component } from 'react';
import './commentContainer.scss';
import { connect } from 'react-redux';

import Comment from '../Comment/Comment.jsx';

class CommentContainer extends Component {
    constructor () {
        super();
        this.state = {
            isEditing: false
        };
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    handleEditClick () {
        this.setState({isEditing: true});
        this.commentEditArea.value = this.commentText.textContent; 
    }

    handleCloseClick () {
        this.setState({isEditing: false});
    }

    render () {
        const commentStatus = this.state.isEditing ? 'editing' : 'no-editing';

        return (
            <div className = {`comment-container ${commentStatus}`}>
                <div className = "comment__text-wrap">
                    <div className = "comment__text">
                        <p ref = {(p) => { this.commentText = p;}}>asdasd</p>
                    </div>
                    <div className = "comment-controls">
                        <span className = "date">
                            <span className = "date-field comment-controls__text">19.02.2018</span>
                            <span className = "text comment-controls__text">(изменен)</span>
                        </span>
                        <span className = "buttons">
                            <span className = "comment-controls__text">-</span>
                            <span 
                                className = "buttons__edit comment-controls__text"
                                onClick = {this.handleEditClick}
                                role = 'button'
                            >
                                    Изменить
                            </span>
                            <span className = "comment-controls__text">-</span>
                            <span className = "buttons__delete comment-controls__text">Удалить</span>
                        </span>
                    </div>
                </div>
                <Comment 
                    textAreaRef = {el => this.commentEditArea = el}
                    buttonText = "Сохранить"
                    close = {this.handleCloseClick}
                    btnStatus = {true}
                />
            </div>
        );
    }
};

export default CommentContainer;
