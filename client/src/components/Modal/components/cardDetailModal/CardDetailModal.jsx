import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getCardDetailsMiddleware } from '../../../../actions/cards';

import './cardDetailModal.scss';

class CardDetailModal extends Component {
    componentWillMount () {
        this.props.fetchData();
    }

    render () {
        return (
            <div>
                CardDetailModal!!!
            </div>
        );
    }
}

CardDetailModal.propTypes = {

};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: id => dispatch(getCardDetailsMiddleware(id))
    };
};

export default connect(null, mapDispatchToProps)(CardDetailModal);

