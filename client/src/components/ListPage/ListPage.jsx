import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './listPage.scss';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header.jsx';
import AddListButton from '../../components/List/AddListButton/AddListButton.jsx';
import { withRouter } from 'react-router-dom';
import List from '../../components/List/List.jsx';
import PageTitle from './PageTitle/PageTitle.jsx';
import { fetchLists } from '../../actions/lists';
import { fetchCards } from '../../actions/cards';
import { updateListMiddleware } from '../../actions/lists';
import { deleteListMiddleware } from '../../actions/lists';
import getBoardId from '../../utils/getBoardId';
import { showCardDetailModal } from '../../actions/modal';

import Modal from '../../components/Modal';

class ListPage extends Component {
    constructor (props) {
        super(props);
        this.title = '';
    }
    componentWillMount () {
        console.log('componentWillMount LISTPAGE');
        document.body.classList.add('list-page');

        const id = getBoardId(); // rename

        const { onFetchLists } = this.props;
        const { pathname } = this.props.location;
        const routes = pathname.match(/([^\/]+)/);
        const baseRoute = routes[0];

        const routeStrategies = {
            boards: () => ({
                type: 'boards',
                id
            }),
            modal: () => {
                const { id, title } = this.props.match.params;
                const { onReloadPage } = this.props;

                onReloadPage({id, title});

                return {
                    type: 'modal',
                    id
                }
            }
        };

        onFetchLists(routeStrategies[baseRoute]());
    }
    componentWillUnmount () {
        console.log('componentWillUnmount LISTPAGE');
        document.body.classList.remove('list-page');
    }
    render () {
        const { lists } = this.props;
    
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
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        lists: state.lists,
        fetching: state.fetching
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchLists: (boardId) => {
            dispatch(fetchLists(boardId))
        },
        onFetchCards: (lists) => dispatch(fetchCards(lists)),
        onUpdateList: (listId, title) => dispatch(updateListMiddleware(listId, title)),
        onDeleteList: (listId) => dispatch(deleteListMiddleware(listId)),
        onReloadPage: data => dispatch(showCardDetailModal(data))
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ListPage)
);
