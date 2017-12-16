import React, { Component } from 'react';
import './list.scss';
import { connect } from 'react-redux';
import ListHeader from './ListHeader/ListHeader.jsx';
import Card from '../Card/Card.jsx';
import { createCardMiddleware } from '../../actions/cards';
import { updateCardTitleMiddleware } from '../../actions/cards';
import { getCards } from '../../reducers/lists';
import getBoardId from '../../utils/getBoardId';

class List extends Component {
    constructor () {
        super();
        this.state = {
            isAddCardOpen: false
        };
        this.openAddCardModal = this.openAddCardModal.bind(this);
        this.closeAddCardModal = this.closeAddCardModal.bind(this);
        this.onHandleAdd = this.onHandleAdd.bind(this);
        this.handleListDelete = this.handleListDelete.bind(this);
    }
    openAddCardModal () {
        this.setState({isAddCardOpen:true});
    }
    closeAddCardModal () {
        this.cardTitle.value = '';
        this.setState({isAddCardOpen:false});
    }
    handleListDelete () {
        const listId = this.props.id;

        this.props.delete(listId);
    }
    onHandleAdd () {
        const listId = this.props.id;
        const title = this.cardTitle.value;
        const boardId = getBoardId();

        this.props.saveCard(title, listId, boardId);

        this.closeAddCardModal();
    }
    render () {
        const cards = this.props.cards;

        let addCardBtnStatus = this.state.isAddCardOpen ? 'hide' : 'show',
            cardInfoBtnStatus = !this.state.isAddCardOpen ? 'hide' : 'show';

        return (
            <div className = "list-container">
                <ListHeader 
                    title = {this.props.title}
                    update = {this.props.updateTitle}
                    listId = {this.props.id}
                    deleteList = {this.handleListDelete}
                />
                <div className = "list-wrap">
                    {
                        cards && cards.map((card, index) => {
                            return (
                                <Card 
                                    key = { index }
                                    title={ card.title }
                                    id = { card._id }
<<<<<<< HEAD
                                    onCardSelect = { this.props.onCardSelect }
                                    updateTitle = { this.props.onUpdateCardTitle }
=======
>>>>>>> f7056d595bea0bc907eeba6062c980a78d4c8ced
                                />
                            );
                        })
                    }
                    <div className = {`card-info ${cardInfoBtnStatus}`}>
                        <textarea 
                            ref = {textarea => { this.cardTitle = textarea }}
                            className = "card-info__title"/>

                        <div className = "card-info_controls">
                            <button
                                onClick = {this.onHandleAdd} 
                                className = "btn btn-success">
                                Добавить
                            </button>
                            <button 
                                type = "button" 
                                className = "close"
                                onClick = {this.closeAddCardModal}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>
                <span 
                    className = {`add-card-btn ${addCardBtnStatus}`}
                    role = "button"
                    onClick = {this.openAddCardModal}
                >
                    Добавить карточку...
                </span>
            </div>
        );
    }
};

function mapStateToProps (state, ownProps) {
    return {
        cards: getCards(state.cards, ownProps.id)
    };
}

function mapDispatchToProps (dispatch) {
    return {
        saveCard: (title, listId, boardId) => dispatch(createCardMiddleware(title, listId, boardId)),
        onUpdateCardTitle: (cardId, title) => dispatch(updateCardTitleMiddleware(cardId, title))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
