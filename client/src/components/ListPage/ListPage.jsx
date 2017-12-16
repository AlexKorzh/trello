import React, { Component } from 'react';
import './listPage.scss';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header.jsx';
import AddListButton from '../../components/List/AddListButton/AddListButton.jsx';
import List from '../../components/List/List.jsx';
import PageTitle from './PageTitle/PageTitle.jsx';
import { fetchLists } from '../../actions/lists';
import { fetchCards } from '../../actions/cards';
import { updateListMiddleware } from '../../actions/lists';
import { deleteListMiddleware } from '../../actions/lists';
import getBoardId from '../../utils/getBoardId';

import Modal from '../../components/Modal';

class ListPage extends Component {
    constructor (props) {
        super(props);
        this.title = '';
    }
    componentDidMount () {
        const boardId = getBoardId();
        this.props.onFetchLists(boardId);
    }
    render () {
        const { lists, modal } = this.props;

        const isModalOpen = modal.modalType;
    
        return (
            <div className = "list-page">
                <Header />
                <div className = "list-page__wrapper">
                    <PageTitle />
                    <div className = "list-page__container">
                        <div className = "list-page__wrap">
                            {
                                lists && lists.map((list, index) => {
                                    return (
                                        <List 
                                            key = { index }
                                            title={ list.title }
                                            id = { list._id }
                                            updateTitle = {this.props.onUpdateList}
                                            delete = {this.props.onDeleteList}
                                        />
                                    );
                                })
                            }
                            <AddListButton />
                        </div>
                    </div>
                </div>
                { isModalOpen && <Modal /> }
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
<<<<<<< HEAD
        lists: state.lists
=======
        lists: state.lists,
        fetching: state.fetching,
        modal: state.modal
>>>>>>> f7056d595bea0bc907eeba6062c980a78d4c8ced
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchLists: (boardId) => {
            dispatch(fetchLists(boardId))
        },
        onFetchCards: (lists) => dispatch(fetchCards(lists)),
        onUpdateList: (listId, title) => dispatch(updateListMiddleware(listId, title)),
        onDeleteList: (listId) => dispatch(deleteListMiddleware(listId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
