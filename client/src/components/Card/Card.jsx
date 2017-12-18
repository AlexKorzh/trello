import React, { Component } from 'react';
import './card.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditIcon from 'material-ui-icons/edit';
import EditModal from './EditModal/EditModal.jsx';
import { showCardDetailModal } from '../../actions/modal';

class Card extends Component {
    constructor () {
        super();
        this.handeEditInconClick = this.handeEditInconClick.bind(this);
        this.findCardPosition = this.findCardPosition.bind(this);
        this.handleEditModalClose = this.handleEditModalClose.bind(this);
        this.handleUpdateTitle = this.handleUpdateTitle.bind(this);
        this.showModal = this.showModal.bind(this);
        this.state = {
            isEditModalOpen: false
        }
        this.editMobalPosition = {
            clientX: '',
            clientY: ''
        }
    }

    handleUpdateTitle () {
        const cardId = this.props.id,
            title = this.props.title,
            currentValue = this.modalTitle.value;

        if (title === currentValue) {
            this.handleEditModalClose();
        } else {
            this.props.updateTitle(cardId, currentValue);
        }

        this.setState({isEditModalOpen: false});
    }

    handleEditModalClose (event) {
        if (event.target.classList.contains('edit-modal')) {
            this.setState({isEditModalOpen: false});
        }
    }

    handeEditInconClick (event) {
        this.findCardPosition(event);
        this.setState({isEditModalOpen: true});
    }

    findCardPosition (event) {
        const cardPosition = event.target.parentElement.parentElement.offsetParent.getBoundingClientRect();

        this.editMobalPosition = {
            clientX: cardPosition.x,
            clientY: cardPosition.y
        }
    }

    showModal (event) {
        if (event.target.classList.contains('edit-icon')) {
            this.handeEditInconClick(event);
        } else if (event.target.parentElement.classList.contains('edit-icon')) {
            this.handeEditInconClick(event);
        } else {
            const { id, onSelect } = this.props;
            
            onSelect(id);
        }
    }

    render () {
        const { title } = this.props;
        const isEditModalOpen = this.state.isEditModalOpen;

        return (
            <div className = "card-info">
                <div className = "card"
                    role = "button"
                    onClick = { this.showModal }
                >
                    <div className = "card__wrap">
                        <div className = "card_title">
                            { title }
                            <div className = "edit-icon__wrap">
                                <EditIcon 
                                    className = "edit-icon"
                                />
                            </div>
                        </div>
                    </div>
                    
                </div>
                {
                    isEditModalOpen ?
                        <EditModal
                            buttonText = "Сохранить"
                            status = {isEditModalOpen} 
                            position = {this.editMobalPosition}
                            close = {this.handleEditModalClose}
                            title = {title}
                            updateTitle = {this.handleUpdateTitle}
                            textareaRef = {(textarea) => this.modalTitle = textarea} 
                        /> : null
                }
            </div>
        );
    }
}

Card.propTypes = {
    title: PropTypes.string,
    id: PropTypes.string.isRequired,
    onSelect: PropTypes.func
};

const mapDispatchToProps = dispatch => {
    return {
        onSelect: id => dispatch(showCardDetailModal(id))
    };
};

export default connect(null, mapDispatchToProps)(Card);

