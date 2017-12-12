import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './card.scss';

class Card extends Component {
    constructor () {
        super();

        this.handleCardSelect = this.handleCardSelect.bind(this);
    }

    handleCardSelect () {
        const { id } = this.props;

        this.props.onCardSelect(id);
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
    id: PropTypes.string.isRequired,
    onCardSelect: PropTypes.function
};

export default Card;
