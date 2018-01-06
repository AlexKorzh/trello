import React, { Component } from 'react';
import './commentPage.scss';
import { connect } from 'react-redux';

import CommentContainer from './CommentContainer/CommentContainer.jsx';
import AddCommentContainer from './AddCommentContainer/AddCommentContainer.jsx';

class CommentPage extends Component {
    constructor () {
        super();
    }

    render () {
        return (
            <div className = "cooment-page">
                <AddCommentContainer />
                <CommentContainer />
            </div>
        );
    }
};

export default CommentPage;
