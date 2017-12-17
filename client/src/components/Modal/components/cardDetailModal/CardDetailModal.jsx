import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCardDetailsMiddleware } from '../../../../actions/cards';

import './cardDetailModal.scss';

class CardDetailModal extends Component {
    componentWillMount () {
        const { id, title } = this.props;

        this.props.history.push(`/modal/${id}/${title}`);
        this.props.fetchData(id);
    }
    
    componentWillUnmount () {
        this.props.history.goBack();
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
    id: PropTypes.string,
    title: PropTypes.string,
    fetchData: PropTypes.func
};

const mapStateToProps = state => {
    const { id, title } = state.modal.modalProps;

    return {
        id,
        title
    };
};


const mapDispatchToProps = dispatch => {
    return {
        fetchData: id => dispatch(getCardDetailsMiddleware(id))
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CardDetailModal)
);
