import React, { Component } from 'react';
import Comment from '../Comment/Comment.jsx';

class AddCommentContainer extends Component {
    constructor () {
        super();
        this.state = {
            isCommentExits: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange () {
        if (this.commentEditArea.value !== '') {
            this.setState({isCommentExits: true});
        } else {
            this.setState({isCommentExits: false});
        }
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
                    btnStatus = {commentBtnStatus}
                />
            </div>
        );
    }
};

export default AddCommentContainer;
