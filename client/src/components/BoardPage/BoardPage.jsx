import React, { Component } from 'react';
import './boardPage.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../Header/Header.jsx';
import BoardButton from './BoardButton/BoardButton.jsx';
import BoardCard from './BoardCard/BoardCard.jsx';
import List from '../List/List.jsx';

import Icon from '../Icon';

import { getBoardsMiddleware } from '../../actions/boards';
import { deleteBoardMiddleware } from '../../actions/boards';

class BoardPage extends Component {
    componentDidMount () {
        this.props.onFetchBoards();
    }
    render () {
        const boards = this.props.boards;

        return (
            <div className = "board-page">
                <Header />
                <div className = "board-wrap container">
                    <div className = "list-wrap">
                        <div className="list-title__wrapper">
                            <Icon
                                name="person_outline"
                                className="list-title__icon"
                            />
                            <div className="list-title">
                                Personal Boards
                            </div>
                        </div>
                        <div className="row">
                            {
                                boards.map((board, index) => {
                                    return (
                                        <BoardCard 
                                            key = { index }
                                            title={ board.title }
                                            id = { board._id }
                                            onDelete = { this.props.onDeleteBoard }
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
            dispatch(getBoardsMiddleware())
        },
        onDeleteBoard: (boardId) => { 
            dispatch(deleteBoardMiddleware(boardId)) 
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);
