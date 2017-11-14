import React from 'react';
import './boardPage.scss';
import Header from '../Header/Header.jsx';
import BoardButton from './BoardButton/BoardButton.jsx';
// import ListContainer from '../../containers/ListContainer/ListContainer.jsx';

const BoardPage = () => {
    return (
        <div className="board-page">
            <Header />
            <div className = "board-wrap container">
                <BoardButton />
            </div>
        </div>
    );
};

export default BoardPage;
