import React, { Component } from 'react';
import './editModal.scss';

class EditModal extends Component {
    constructor (props) {
        super(props);
    }
    
    render () {
        const status = this.props.status ? 'show' : 'hide';
        let position = this.props.position,
            clientX = position.clientX,
            clientY = position.clientY;

        return (
            <div 
                className = {`edit-modal ${status}`}
                onClick = {this.props.close}
                role = 'tab'
            >
                <div 
                    className = "edit-modal__inner-wrap" 
                    style = {{left: clientX + 'px',  top: clientY + 'px'}}>
                    <textarea
                        className = "edit-modal__title" 
                        ref = {this.props.textareaRef}
                        defaultValue = {this.props.title}
                    />
                    <button 
                        className = "edit-modal__button btn btn-success"
                        onClick = {this.props.updateTitle}
                    >
                        {this.props.buttonText}
                    </button>
                </div>
                
            </div>
        );
    }
}

export default EditModal;
