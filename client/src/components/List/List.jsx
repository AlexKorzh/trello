import React, { Component } from 'react';
import './list.scss';

class List extends Component {
    constructor () {
        super();
        this.state = {
            isAddCardOpen: false,
            cards:[]
        };
        this.openAddCardModal = this.openAddCardModal.bind(this);
        this.closeAddCardModal = this.closeAddCardModal.bind(this);
    }

    openAddCardModal () {
        this.setState({isAddCardOpen:true});
    }

    closeAddCardModal () {
        this.setState({isAddCardOpen:false});
    }

    render () {
        let addCardBtnStatus = this.state.isAddCardOpen ? 'hide' : 'show',
            cardInfoBtnStatus = !this.state.isAddCardOpen ? 'hide' : 'show';

        return (
            <div className = "list-container">
                <div className = "list-wrap">
                    <div className = "list-c__head">
                        {this.props.title}
                    </div>
                    <span 
                        className = {`add-card-btn ${addCardBtnStatus}`}
                        role = "button"
                        onClick = {this.openAddCardModal}
                    >
                        Добавить карточку...
                    </span>
                    <div className = {`card-info ${cardInfoBtnStatus}`}>
                        <textarea className = "card-info__title"/>
                        <div className = "card-info_controls">
                            <button 
                                className = "btn btn-success">
                                Добавить
                            </button>
                            <button 
                                type = "button" 
                                className = "close"
                                onClick = {this.closeAddCardModal}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default List;
