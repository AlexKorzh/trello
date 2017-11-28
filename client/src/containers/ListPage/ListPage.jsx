import React, { Component } from 'react';
import './listPage.scss';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header.jsx';
import AddListButton from '../../components/List/AddListButton/AddListButton.jsx';
import List from '../../components/List/List.jsx';
import fetchBoardLists from '../../actions/lists';
import getBoardId from '../../utils/getBoardId';
import fetchCards from '../../actions/fetchCards';

class ListPage extends Component {
    constructor () {
        super();
    }
    componentDidMount () {
        const boardId = getBoardId();
        this.props.onFetchBoardLists(boardId);
        // const boardId = getBoardId();
    //     // const lists = this.props.lists.filter((list) => list._id);
    //     // return this.props.onFetchCards(lists);

    //     Promise.resolve(this.props.onFetchBoardLists(boardId)) // dispatch
    //     .then(function (response) {
    //     console.log('1');
    //       return response;
    //     })
    //     .then(test.bind);

    //     const test = function (response){
    //         console.log('2');
    //             const lists = this.props.lists.filter((list) => list._id);
    //             return this.props.onFetchCards(lists);
    //     }
        
        // const promises = [];

        // function getPromises () {
        //     return new Promise(function (resolve, reject) {
        //         const boardId = getBoardId();
        //         resolve(this.props.onFetchBoardLists(boardId));
        //     });
        // }
        // promises.push(getPromises());

        // console.log(promises);
    }

    render () {
        const lists = this.props.lists;
    
        return (
            <div className = "list-page">
                <Header />
                <div className = "list-page__container">
                    <div className = "list-page__wrap">
                        {
                            lists && lists.map((list, index) => {
                                return (
                                    <List 
                                        key = { index }
                                        title={ list.title }
                                        id = { list._id }
                                    />
                                );
                            })
                        }
                        <AddListButton />
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        lists: state.lists
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchBoardLists: (boardId) => {
            dispatch(fetchBoardLists(boardId))
        },
        onFetchCards: (lists) => dispatch(fetchCards(lists))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
