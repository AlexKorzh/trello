import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import fetchBoards from '../../actions/board';

import './boardPage.scss';
import Header from '../Header/Header.jsx';
import BoardButton from './BoardButton/BoardButton.jsx';
// import ListContainer from '../../containers/ListContainer/ListContainer.jsx';

class BoardPage extends Component {
    constructor () {
        super();

    }

    componentDidMount () {
        console.log('componentDidMount:');
        this.props.onFetchBoards();
    }

    render () {
        return (
            <div className="board-page">
                <Header />
                <div className = "board-wrap container">
                    <BoardButton />
                </div>
            </div>
        );
    }
}

BoardPage.propTypes = {
    onFetchBoards: PropTypes.func.isRequired
};

export default connect(
    state => ({}),
    dispatch => ({
        onFetchBoards: () => {
            dispatch(fetchBoards());
        }
    })
)(BoardPage);
