import React from 'react';
import './boardButton.scss';
import BoardForm from './BoardForm/BoardForm.jsx';

class BoardButton extends React.Component {
    constructor () {
        super();
        this.state = {isModalOpen: false};
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal () {
        this.setState({isModalOpen: true});      
    }

    closeModal () {
        this.setState({isModalOpen: false});
    }

    render () {
        return (
            <div className = "button-wrap">
                <button 
                    className = "btn add-board-btn btn-secondary" 
                    onClick = {this.openModal}>
                    Создать новую доску…
                </button>
                <BoardForm 
                    close = {this.closeModal} 
                    show = {this.state.isModalOpen} 
                />
            </div>                
        );
    }
};

export default BoardButton;
