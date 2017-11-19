import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import fetchBoards from '../../actions/board';

import './boardPage.scss';

import Header from '../Header/Header.jsx';
import BoardButton from './BoardButton/BoardButton.jsx';
import BoardCard from './BoardCard/BoardCard.jsx';

import List from '../List/List.jsx';
// import ListContainer from '../../containers/ListContainer/ListContainer.jsx';

class BoardPage extends Component {
    componentDidMount () {
        this.props.onFetchBoards();
    }

    render () {
        const boards = this.props.boards;
console.log('BOARDS', this.props.boards);
        return (
            <div className = "board-page">
                <Header />
                <div className = "board-wrap container">
                    <div className = "list-wrap">
                        <div className="row">
                            {
                                boards.map((board, index) => {
                                    return (
                                        <BoardCard 
                                            key = { index }
                                            title={ board.title }
                                            id = { board._id }
                                        />
                                    );
                                })
                            }
                            <BoardButton /> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BoardPage.propTypes = {
    onFetchBoards: PropTypes.func.isRequired,
    boards: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            title: PropTypes.string
        })
    )
};

const mapStateToProps = state => {
    return {
        boards: state.boards
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchBoards: () => {
            dispatch(fetchBoards())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);
