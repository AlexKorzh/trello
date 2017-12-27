import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './listPage.scss';

import CreateListButton from '../List/CreateListButton';
import PageTitle from './PageTitle';
import Header from '../Header';
import List from '../List';

import { updateListMiddleware } from '../../actions/lists';
import { deleteListMiddleware } from '../../actions/lists';
import { fetchLists } from '../../actions/lists';
import { fetchCards } from '../../actions/cards';
import getRoute from '../../utils/getRoute';
import history from '../../utils/history';

import { showCardDetailModal } from '../../actions/modal';
import { hideModal } from '../../actions/modal';

class ListPage extends Component {
    constructor (props) {
        super(props);
        this.title = '';
        this.isPageReloaded = true;
    }

    componentWillMount () {
        document.body.classList.add('list-page');

        const { id } = this.props.match.params;
        const { onFetchLists } = this.props;
        const { root } = getRoute();

        onFetchLists({ type: root, id });
    }

    componentWillReceiveProps (nextProps) {
        const { id, title } = nextProps.match.params;
        const { modalType } = nextProps.modal;
        const { root } = getRoute();
        
        if (root === 'c' && !modalType && nextProps.history.action === 'POP' && nextProps.cards.length) {
            this.props.onReloadPage({id, title});
        } else if (nextProps.history.action === 'POP' &&
            nextProps.modal.modalType && root === 'b') {
            this.props.onHideModal();
        } else if (root === 'c' && !modalType && nextProps.history.action === 'PUSH') {
            console.log('TEMA THE BEST AND ALEX!!! :) ');
            history.push(`/b/${this.props.boardId}/${this.props.title}`);
        } 
    }

    componentWillUnmount () {
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
                            <CreateListButton />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

ListPage.propTypes = {
    onFetchLists: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string
        })
    })
};

const mapStateToProps = state => {
    return {
        lists: state.lists,
        fetching: state.fetching,
        modal: state.modal,
        cards: state.cards,
        boardId: state.boardId,
        title: state.title
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
        onReloadPage: data => dispatch(showCardDetailModal(data)),
        onHideModal: () => dispatch(hideModal())
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ListPage)
);
