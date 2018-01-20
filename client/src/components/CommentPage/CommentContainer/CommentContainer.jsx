import React, { Component } from 'react';
import './commentContainer.scss';
import { connect } from 'react-redux';

import Comment from '../Comment/Comment.jsx';
import ModalList from '../../ModalList/ModalList.jsx';
import convertDateString from '../../../utils/convertDateString.js';

class CommentContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isEditing: false,
            isDeleteModalOpen: false
        };
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.resetCommentState = this.resetCommentState.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.onHideModal = this.onHideModal.bind(this);
        this.onDeleteComment = this.onDeleteComment.bind(this);
        this.normalizeDate = this.normalizeDate.bind(this);
        this.findModalPosition = this.findModalPosition.bind(this);
    }

    handleEditClick () {
        this.setState({isEditing: true});
        this.commentEditArea.value = this.commentText.textContent; 
    }

    handleSaveClick () {
        const commentValue = this.commentText.textContent;
        const commentEditArea = this.commentEditArea.value;

        if (commentValue !== commentEditArea && commentEditArea) {
            const comment = {
                cardId: this.props.cardId,
                commentId: this.props.commentId,
                text: commentEditArea,
                date: new Date()
            }
            
            this.props.update(comment);
            this.resetCommentState();
        }

        this.resetCommentState();
    }

    findModalPosition (event) {
        this.modalPosition = event.target.getBoundingClientRect();
        
        let viewPortDiff = visualViewport.height - this.modalPosition.y;
        if (viewPortDiff < 100) this.modalPosition.viewPortDiff = viewPortDiff;
    }

    handleDeleteClick (event) {
        this.findModalPosition(event);
        this.setState({isDeleteModalOpen: true});
    }

    resetCommentState () {
        this.commentEditArea.value = '';
        this.handleCloseClick();
    }

    handleCloseClick () {
        this.setState({isEditing: false});
    }

    onHideModal (e) {
        this.setState({isDeleteModalOpen: false});
    }

    onDeleteComment (e) {
        this.onHideModal(e);

        const comment = {
            cardId: this.props.cardId,
            commentId: this.props.commentId
        }

        this.props.deleteComment(comment);
    }

    normalizeDate () {
        const date = convertDateString(this.props.commentDate);

        return date;
    }

    render () {
        const commentStatus = this.state.isEditing ? 'editing' : 'no-editing';
        const modalStatus = this.state.isDeleteModalOpen;
        const commentDate = this.props.commentDate;

        return (
            <div className = {`comment-container ${commentStatus}`}>
                <div className = "comment__text-wrap">
                    <div className = "comment__text">
                        <p ref = {(p) => { this.commentText = p;} }>{this.props.body}</p>
                    </div>
                    <div className = "comment-controls">
                        <span className = "date">
                            <span className = "date-field comment-controls__text">{this.normalizeDate()}</span>
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
                            <span 
                                className = "buttons__delete comment-controls__text"
                                onClick = { this.handleDeleteClick }
                                role = 'button'
                            >
                                Удалить
                            </span>
                            {
                                modalStatus ?
                                    <ModalList
                                        title = 'Удаление комментария'
                                        buttonText = 'Удалить'
                                        status = { modalStatus }
                                        close = { this.onHideModal } 
                                        delete = { this.onDeleteComment }
                                        modalPosition = { this.modalPosition }
                                    /> : null
                            }
                        </span>
                    </div>
                </div>
                <Comment 
                    textAreaRef = { el => this.commentEditArea = el }
                    buttonText = "Сохранить"
                    close = { this.handleCloseClick }
                    handleClick = { this.handleSaveClick }
                    btnStatus = { true }
                />
            </div>
        );
    }
};

export default CommentContainer;
