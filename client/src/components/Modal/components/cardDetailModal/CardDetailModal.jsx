import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history from '../../../../utils/history';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Title from '../../../Title/Title.jsx';

import { getCardDetailsMiddleware } from '../../../../actions/cards';
import { updateCardTitleMiddleware } from '../../../../actions/cards';

import findCover from '../../../../utils/findCover';

import './cardDetailModal.scss';

import Cover from './components/Cover';
import CommentPage from '../../components/../../CommentPage/CommentPage.jsx';

class CardDetailModal extends Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {
        const { _id : id } = this.props.card;
        console.log('componentWillMount::CardDetailModal');
        this.props.fetchData(id);
    }

    componentWillUnmount () {
        console.log('componentWillUnmount::CardDetailModal');
        const { boardId } = this.props;

        console.log(boardId);
    }

    render () {
        const { card } = this.props;
        const { title, attachments } = card;
        const itemWithCover = attachments.length && findCover(attachments);

        return (
            <div className="card-detail__wrapper">
                { itemWithCover ?
                    <Cover
                        cover={ itemWithCover }
                    /> : null
                }
                <div className="card-detail__content">
                    <Title 
                        title = {title}
                        updateTitle = {this.props.onUpdateCardTitle}
                        id = {this.props.id} 
                    />
                    CardDetailModal!!!<br/>
                    Title: {title}<br/>
                    id: { this.props.id}

                    <CommentPage />
                </div>
            </div>
        );
    }
}

CardDetailModal.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    fetchData: PropTypes.func
};

// const mapStateToProps = state => {
//     const { id, title } = state.modal.modalProps;
//     const boardId = state.cards.length && 
//         state.cards
//             .find(card => card._id === id && card.board)
//             .board;

//     return {
//         id,
//         title,
//         boardId
//     };
// };

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
