import React, { Component } from 'react';
import './listHeader.scss';
import { connect } from 'react-redux';
import ModalList from '../../ModalList/ModalList.jsx';

class ListHeader extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isListEditAreaOpen: false,
            isModalOpen: false
        };
        this.handleTitleClick = this.handleTitleClick.bind(this);
        this.handeKeyPress = this.handeKeyPress.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleControlClick = this.handleControlClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    handleTitleClick () {
        this.textArea.value = this.props.title;
        this.setState({isListEditAreaOpen: true});
    }
    handleCloseClick () {
        this.setState({isListEditAreaOpen: false});
    }
    handleControlClick () {
        this.setState({isModalOpen: true});
    }
    closeModal () {
        this.setState({isModalOpen: false});
    }
    handeKeyPress (event) {
        if (event.charCode === 13) {
            let listId = this.props.listId,
                title = this.props.title,
                currentValue = this.textArea.value;

            if (title === currentValue) {
                this.setState({isListEditAreaOpen: false});
            } else {
                this.props.update(listId, currentValue);
                this.setState({isListEditAreaOpen: false});
            }
        }
    }

    render () {
        const modalStatus = this.state.isModalOpen;

        let listHeadTitleStatus = this.state.isListEditAreaOpen ? 'hide' : 'show',
            listEditAreaStatus = !this.state.isListEditAreaOpen ? 'hide' : 'show';

        return (
            <div 
                className = "list-c__head"
                onKeyPress = {this.handeKeyPress}
                role = "button"
            >
                <div
                    role = "button" 
                    className = {`list-c__head-title ${listHeadTitleStatus}`}
                    onClick = {this.handleTitleClick}
                >
                    {this.props.title}
                </div>
                <div className = {`list-edit-area ${listEditAreaStatus}`}>
                    <textarea 
                        className = "form-control" 
                        ref = {(textarea) => { this.textArea = textarea }} 
                    />
                    <button 
                        onClick = {this.handleCloseClick} 
                        type = "button" 
                        className = "close" 
                        aria-label = "Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <span 
                    onClick = {this.handleControlClick} 
                    className = "list-control"
                    role = "tab"
                >
                    <div className = "list-control__text">...</div>
                </span>
                {
                    modalStatus ?
                        <ModalList
                            title = 'Действие со списком'
                            buttonText = 'Удалить'
                            status = {this.state.isModalOpen}
                            close = {this.closeModal} 
                            delete = {this.props.deleteList}
                        /> : null
                }
                
            </div>
        );
    }
};

export default ListHeader;
