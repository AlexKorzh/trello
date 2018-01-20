import React, { Component } from 'react';
import './comment.scss';

class Comment extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className = "comment">
                <div className = "comment-frame">
                    <div className = "comment__editarea">
                        <textarea
                            defaultValue = ""
                            className = "comment__textarea"
                            ref = {this.props.textAreaRef}
                            placeholder = {this.props.placeholder}
                            onChange = {this.props.handleChange}
                        />
                    </div>
                </div>
                <div className="comment__button-controls">
                    <button
                        disabled = {!this.props.btnStatus} 
                        className = "comment__button btn btn-success"
                        onClick = {this.props.handleClick} 
                    >
                        {this.props.buttonText}
                    </button>
                    <i
                        className = "material-icons icon-close comment__button-close"
                        role = "button"
                        onClick = {this.props.close}
                    >
                        close
                    </i>
                </div>
            </div>
        );
    }
};

export default Comment;
