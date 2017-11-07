import React from 'react';
import './boardPage.scss';
import '../Header/Header.jsx'
import BoardButton from './BoardButton/BoardButton.jsx';

const BoardPage = () => {
    return (
        <div className="board-page container">
            <div className = "board-wrap">
                <BoardButton />
            </div>
        </div>
    );
};

export default BoardPage;
