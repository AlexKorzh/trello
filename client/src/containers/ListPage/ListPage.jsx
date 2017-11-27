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
        // const lists = this.props.lists.filter((list) => list._id);
        // this.props.onFetchCards(lists);

        function getCards () {
            console.log('[[ 2 ]]', this.props.lists);
            const lists = this.props.lists.map((list) => list._id);
         
            this.props.onFetchCards(lists);
        }

        const test = getCards.bind(this);

        const boardId = getBoardId();
        this.props.onFetchBoardLists(boardId, () => {
            console.log('[[ 1 ]]', this.props.lists);
            test();
        });




        // async function test () {
        //     setTimeout(() => {
        //         'Hello from Async!'
        //     }, 3000);
        // }

        // test();
        // let getLists = new Promise((resolve, reject) => {debugger;
        //     const boardId = getBoardId();
        //     const test = this.props.onFetchBoardLists(boardId);
        //     resolve(test);
        // });

        // getLists.then((lists) => {
        //     console.log('lists-->', lists);
        // });
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
        onFetchBoardLists: (boardId, callback) => {
            dispatch(fetchBoardLists(boardId, callback))
        },
        onFetchCards: (lists) => dispatch(fetchCards(lists))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
