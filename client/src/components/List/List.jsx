import React, { Component } from 'react';
import './list.scss';

class List extends Component {
    constructor () {
        super();
    }
    test () {

    }
    render () {
        return (
            <div className = "list-container">
                <div className = "list-c__head">
                    Some Tile
                </div>
                <span 
                    className = "add-card-btn"
                >
                    Добавить карточку...
                </span>
            </div>
        );
    }
};

export default List;
