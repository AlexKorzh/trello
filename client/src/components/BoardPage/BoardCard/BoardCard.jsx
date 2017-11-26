import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import DeleteIcon from 'material-ui-icons/delete';

import './BoardCard.scss';

class BoardCard extends Component {
    constructor () {
        super();

        this.goTo = this.goTo.bind(this);
        this.handleBoardDelete = this.handleBoardDelete.bind(this);
    }

    goTo () {
        const id = this.props.id;
        const title = this.props.title;

        this.props.history.push(`/boards/${id}/${title}`);
    }

    handleBoardDelete (e) {
        e.stopPropagation();

        const boardId  = this.props.id;

        this.props.onDelete(boardId);
    }

    render () {
        const styles = {
            position: 'absolute',
            color: 'rgba(255, 255, 255, 1)'
        };

        return (
            <div className="col-3">
                <a
                    className="card card-custom board-card text-white bg-card p-2"
                    role = "button"
                    onClick = { this.goTo }
                >
                    { this.props.title }
                    <DeleteIcon 
                        className="delete-icon"
                        style={ styles }
                        onClick = { this.handleBoardDelete }
                    />
                </a>
            </div>
        );
    }
};

BoardCard.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

export default withRouter(BoardCard);
