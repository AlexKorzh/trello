import React from 'react';
import './boardButton.scss';
import BoardForm from './BoardForm/BoardForm.jsx';

class BoardButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {isModalOpen: false};
        this.openModal = this.openModal.bind(this);
    }

    openModal () {
        this.setState({isModalOpen: true});      
    }

    render () {
        return (
            <button 
                onClick = {this.openModal} 
                className = "btn add-board-btn btn-secondary">
                Создать новую доску…
                <BoardForm open = {this.state} />
            </button>
            
        );
    }
};

export default BoardButton;
