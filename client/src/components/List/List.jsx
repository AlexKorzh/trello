import React, { Component } from 'react';
import './list.scss';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import ListHeader from './ListHeader/ListHeader.jsx';
import Card from '../Card/Card.jsx';
import { createCardMiddleware } from '../../actions/cards';
import { updateCardTitleMiddleware } from '../../actions/cards';
import { getCards } from '../../reducers/lists';

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
        this.onDrop = this.onDrop.bind(this);
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
    onDrop (acceptedFiles) {
        const file = acceptedFiles[0];
        const { id: list, boardId: board } = this.props;
        const card = { list, board, title: file.name, file };

        this.props.createCard(card);
        // const fileNames = acceptedFiles.map(file => file.name);
        // const { id: list, boardId: board } = this.props;
        // const files = fileNames.map(name => ({list, board, title: name}));
        // const isSingle = files.length === 1;

        // isSingle ? this.props.createCard(files);
    }
    onHandleAdd () {
        const { id: list, boardId: board } = this.props;
        const { value } = this.cardTitle;

        this.props.createCard({list, board, title: value});

        this.closeAddCardModal();
    }
    render () {
        const cards = this.props.cards;

        let addCardBtnStatus = this.state.isAddCardOpen ? 'hide' : 'show',
            cardInfoBtnStatus = !this.state.isAddCardOpen ? 'hide' : 'show';

        return (
            <Dropzone
                className="dropzone-container"
                disablePreview={ true }
                disableClick={ true }
                multiple={ false }
                onDrop={ this.onDrop }
            >
                <div className = "list-container">
                    <div className = "list-content">
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
                                            attachments = { card.attachments }
                                            id = { card._id }
                                            updateTitle = { this.props.onUpdateCardTitle }
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
                </div>
            </Dropzone>
        );
    }
};

function mapStateToProps (state, ownProps) {
    return {
        cards: getCards(state.cards, ownProps.id),
        boardId: state.boardId
    };
}

function mapDispatchToProps (dispatch) {
    return {
        createCard: payload => dispatch(createCardMiddleware(payload)),
        onUpdateCardTitle: (cardId, title) => dispatch(updateCardTitleMiddleware(cardId, title))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
