import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getCardDetailsMiddleware } from '../../../../actions/cards';

import './cardDetailModal.scss';

class CardDetailModal extends Component {
    componentWillMount () {
        const { id } = this.props;

        this.props.fetchData(id);
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

const mapStateToProps = state => {
    return {
        id: state.modal.modalProps
    };
};


const mapDispatchToProps = dispatch => {
    return {
        fetchData: id => dispatch(getCardDetailsMiddleware(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailModal);

