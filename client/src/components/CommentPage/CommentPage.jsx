import React, { Component } from 'react';
import './commentPage.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addCommentMiddleware } from '../../middlewares/cards';
import { updateCommentMiddleware } from '../../middlewares/cards';
import { deleteCommentMiddleware } from '../../middlewares/cards';

import CommentContainer from './CommentContainer/CommentContainer.jsx';
import AddCommentContainer from './AddCommentContainer/AddCommentContainer.jsx';

class CommentPage extends Component {
    constructor (props) {
        super(props);
    }
    
    render () {
        const card = this.props.card;
        const comments = this.props.card.comments;

        return (
            <div className = "cooment-page">
                <AddCommentContainer
                    cardId = { card._id } 
                    addComment = { this.props.onAddComment }
                />
                <h2 className = "cooment-page__title">Действия</h2>
                {
                    comments.map((comment, index) => {
                        return (
                            <CommentContainer
                                cardId = { card._id } 
                                key = { index }
                                body = { comment.body }
                                commentId = { comment._id }
                                commentDate = { comment.date }
                                update = { this.props.onUpdateComment }
                                deleteComment = { this.props.onDeleteComment } 
                            />
                        );
                    }).reverse()
                }
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddComment: comment => dispatch(addCommentMiddleware(comment)),
        onUpdateComment: comment => dispatch(updateCommentMiddleware(comment)),
        onDeleteComment: comment => dispatch(deleteCommentMiddleware(comment))
    };
}

export default connect(null, mapDispatchToProps)(CommentPage);
