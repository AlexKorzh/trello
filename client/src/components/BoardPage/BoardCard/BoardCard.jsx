import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import mui from 'material-ui';
import DeleteIcon from 'react-material-icons/icons/action/delete';

import './BoardCard.scss';

class BoardCard extends Component {
    constructor () {
        super();

        this.goTo = this.goTo.bind(this);
        this.deleteBoard = this.deleteBoard.bind(this);
    }

    goTo () {
        const id = this.props.id;
        const title = this.props.title;

        this.props.history.push(`/boards/${id}/${title}`);
    }

    deleteBoard (e) {
        e.stopPropagation();

        const { id } = this.props;
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
                        onClick = { this.deleteBoard }
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
