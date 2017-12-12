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
        const isOpen = this.state.isModalOpen;

        return (
            <div className = "col-3">
                <button
                    className = "card card-custom p-2 button-create"
                    onClick = { this.openModal }
                >
                    Создать новую доску…
                </button>
                {
                    isOpen ?
                        <BoardForm 
                            close = {this.closeModal} 
                            show = {this.state.isModalOpen}
                            title = 'Создание доски'
                            placeholder = 'Например, «Издание календаря»…'
                            buttonTitle = 'Создать'
                        /> 
                        : null
                }
            </div>                
        );
    }
};

export default BoardButton;
