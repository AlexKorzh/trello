import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showCardDetailModal } from '../../actions/modal'

import './card.scss';

const Card = props => {
    const { id, title, onSelect } = props;
    const showModal = onSelect.bind(null, id);

    return (
        <div className = "card-info">
            <div className = "card"
                role = "button"
                onClick = { showModal }
            >
                <div className = "card_title">{ title }</div>
            </div>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string,
    id: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        onSelect: id => dispatch(showCardDetailModal(id))
    };
};

export default connect(null, mapDispatchToProps)(Card);

