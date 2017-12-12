import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './card.scss';

class Card extends Component {
    constructor () {
        super();

        this.handleCardSelect = this.handleCardSelect.bind(this);
    }

    handleCardSelect () {
        const { id } = this.props;

        console.log(id, this.props);
    }

    render () {
        const { title } = this.props;

        return (
            <div className = "card-info">
                <div className = "card"
                    role = "button"
                    onClick = { this.handleCardSelect }
                >
                    <div className = "card_title">{ title }</div>
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    title: PropTypes.string,
    id: PropTypes.string.isRequired
};

export default connect(null, null)(Card);

