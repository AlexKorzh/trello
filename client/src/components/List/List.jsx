import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCard } from '../../actions';
import { getListCards } from '../../reducers/boardLists';
import Card from '../Card/Card.jsx';
import './list.scss';

class List extends Component {
    constructor () {
        super();
        this.state = {
            isAddCardOpen: false
        };
        this.openAddCardModal = this.openAddCardModal.bind(this);
        this.closeAddCardModal = this.closeAddCardModal.bind(this);
        this.onHandleAdd = this.onHandleAdd.bind(this);
    }
    openAddCardModal () {
        this.setState({isAddCardOpen:true});
    }

    closeAddCardModal () {
        this.cardTitle.value = '';
        this.setState({isAddCardOpen:false});
    }

    onHandleAdd () {
        const listId = this.props.id;
        const title = this.cardTitle.value;

        this.props.saveCard(title, listId);

        this.closeAddCardModal();
    }

    render () {
        const cards = this.props.cards;
        console.log('T E S T -------------->' ,cards);

        let addCardBtnStatus = this.state.isAddCardOpen ? 'hide' : 'show',
            cardInfoBtnStatus = !this.state.isAddCardOpen ? 'hide' : 'show';
        return (
            <div className = "list-container">
                <div className = "list-wrap">
                    <div className = "list-c__head">
                        {this.props.title}
                    </div>
                    {
                        cards && cards.map((card, index) => {
                            return (
                                <Card 
                                    key = { index }
                                    title={ card.title }
                                    id = { cards._id }
                                />
                            );
                        })
                    }
                    <span 
                        className = {`add-card-btn ${addCardBtnStatus}`}
                        role = "button"
                        onClick = {this.openAddCardModal}
                    >
                        Добавить карточку...
                    </span>
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
            </div>
        );
    }
};

function mapStateToProps (state, ownProps) {
    return {
        cards: getListCards(state.cards, ownProps.id)
    };
}

function mapDispatchToProps (dispatch) {
    return {
        saveCard: (title, listId) => dispatch(createCard(title, listId))
        // onFetchCards: (listId) => dispatch(fetchCards(listId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
