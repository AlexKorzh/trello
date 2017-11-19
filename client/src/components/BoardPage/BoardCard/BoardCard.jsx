import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './BoardCard.scss';

class BoardCard extends Component {
    constructor () {
        super();

        this.goTo = this.goTo.bind(this);
    }
    goTo () {
        const id = this.props.id;

        this.props.history.push(`/boards/${id}`);
    }

    render () {
        return (
            <div className="col-3">
                <a
                    className="card card-custom board-card text-white bg-card p-2"
                    role = "button"
                    onClick = { this.goTo }
                >
                    { this.props.title }
                </a>
            </div>
        );
    }
};

BoardCard.propTypes = {
    title: PropTypes.string.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

export default withRouter(BoardCard);
