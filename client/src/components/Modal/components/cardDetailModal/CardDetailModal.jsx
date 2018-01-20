import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history from '../../../../utils/history';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Title from '../../../Title/Title.jsx';

import { getCardDetailsMiddleware } from '../../../../actions/cards';
import { updateCardTitleMiddleware } from '../../../../actions/cards';

import './cardDetailModal.scss';

import CommentPage from '../../components/../../CommentPage/CommentPage.jsx';
import SidebarContainer from '../../../SidebarContainer/SidebarContainer.jsx';

class CardDetailModal extends Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {
        const { _id : id } = this.props.card;

        this.props.fetchData(id);
        document.body.classList.add('modal-open');
    }

    componentWillUnmount () {
        const { boardId } = this.props;

        document.body.classList.remove('modal-open');
    }

    render () {
        const title = this.props.card.title;

        return (
            <div>
                <Title 
                    title = {title}
                    updateTitle = {this.props.onUpdateCardTitle}
                    id = {this.props.id} 
                />
                CardDetailModal!!!<br/>
                Title: {title}<br/>
                id: {this.props.id}
                <div className = "modal-wrap">
                    <CommentPage card = {this.props.card}/>
                </div>
                <SidebarContainer card = {this.props.card}/>
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
    const id = state.modal.modalProps.id;

    return  {
        card: state.cards.find((card) => card._id === id)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: id => dispatch(getCardDetailsMiddleware(id)),
        onUpdateCardTitle: (cardId, title) => dispatch(updateCardTitleMiddleware(cardId, title))
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CardDetailModal)
);
