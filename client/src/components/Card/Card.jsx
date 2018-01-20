import React, { Component } from 'react';
import './card.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import EditIcon from 'material-ui-icons/edit';
import Icon from '../Icon';

import EditModal from './EditModal/EditModal.jsx';
import { showCardDetailModal } from '../../actionCreators/modal';
import { Link, withRouter } from 'react-router-dom';
import getRoute from '../../utils/getRoute';
import normalize from '../../utils/normalize';

import CardPreview from './components/CardPreview';
import Badge from './components/Badge';

const makeBadge = data => {
    const { name, className, length } = data;

    return (
        <Badge
            name = { name }
            className = { className }
            items = { length }
        />
    );
}

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
        event.preventDefault();
        
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
        const { id } = this.props;

        !id && event.preventDefault();

        if (event.target.classList.contains('edit-icon__card')) {
            event.preventDefault();
            this.handeEditInconClick(event);
        } else {
            const { title, onSelect } = this.props;

            onSelect({id, title});
        }
    }

    render () {
        const { id, title, attachments, comments } = this.props;
        const isEditModalOpen = this.state.isEditModalOpen;
        const isAttachments = attachments && attachments.length;
        const isComments = comments && comments.length;

        return (
            <div className = "card-info">
                <Link
                    to = {`/c/${id}/${normalize(title)}`}
                    onClick={this.showModal}
                    className = "card"
                >
                    <div className = "card__wrap">
                        {
                            isAttachments ?
                                <CardPreview
                                    attachments={ attachments }
                                /> : null
                        }
                        <div className = "card_title">
                            { title }
                            <Icon
                                name='edit'
                                className='edit-icon__card'
                                role='button'
                                onClick={ this.handeEditInconClick }
                            />
                            <div className = "badges-wrap">
                                {
                                    isComments ?
                                        makeBadge({
                                            name: 'chat_bubble_outline', 
                                            className: 'comment-icon__card',
                                            length: comments.length
                                        })
                                        : null
                                }
                                {
                                    isAttachments ?
                                        makeBadge({
                                            name: 'attachment', 
                                            className: 'attachment-icon__card',
                                            length: attachments.length
                                        })
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                    
                </Link>
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
    id: PropTypes.string,
    onSelect: PropTypes.func
};

const mapDispatchToProps = dispatch => {
    return {
        onSelect: data => dispatch(showCardDetailModal(data))
    };
};

export default connect(null, mapDispatchToProps)(Card);
