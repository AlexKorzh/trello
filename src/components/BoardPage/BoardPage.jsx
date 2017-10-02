import React from 'react';
import './boardPage.scss';
import BoardButton from './BoardButton';

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
