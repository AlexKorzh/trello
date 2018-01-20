import React, { Component } from 'react';
import Comment from '../Comment/Comment.jsx';

class AddCommentContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isCommentExits: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateComment = this.handleCreateComment.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    handleChange () {
        if (this.commentEditArea.value !== '') {
            this.setState({isCommentExits: true});
        } else {
            this.setState({isCommentExits: false});
        }
    }
    
    handleCreateComment () {
        const comment = {
            text: this.commentEditArea.value,
            cardId: this.props.cardId,
            date: new Date()
        };
    
        this.props.addComment(comment);
        this.resetState();
    }

    resetState () {
        this.commentEditArea.value = '';
        this.setState({isCommentExits: false});
    }

    render () {
        const commentBtnStatus = this.state.isCommentExits;

        return (
            <div className = "add-comment-wrap">
                <h2 className = "title">Добавление комментария</h2>
                <Comment 
                    buttonText = "Сохранить"
                    placeholder = "Напишите комментарий..."
                    textAreaRef = {el => this.commentEditArea = el}
                    handleChange = {this.handleChange} 
                    handleClick = {this.handleCreateComment}
                    btnStatus = {commentBtnStatus}
                />
            </div>
        );
    }
};

export default AddCommentContainer;
