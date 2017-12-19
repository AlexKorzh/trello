import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history from '../../../../utils/history';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCardDetailsMiddleware } from '../../../../actions/cards';

import './cardDetailModal.scss';

class CardDetailModal extends Component {
    componentWillMount () {
        const { id, title } = this.props;

        history.push(`/boards/modal/${id}/${title}`);
        this.props.fetchData(id);
    }
    
    componentWillUnmount () {
        const { boardId } = this.props;

        history.push(`/boards/${boardId}/no-title`);
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
    const boardId = state.cards.length && 
        state.cards
            .find(card => card._id === id && card.board)
            .board;

    return {
        id,
        title,
        boardId
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
