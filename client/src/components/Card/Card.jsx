import React, { Component } from 'react';
import './card.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditIcon from 'material-ui-icons/edit';
import EditModal from './EditModal/EditModal.jsx';
import { showCardDetailModal } from '../../actions/modal';
import { Link, withRouter } from 'react-router-dom';
import getRoute from '../../utils/getRoute';

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

    componentDidMount () {
        const { id } = this.props.match.params;
        const cardId = this.props.id;
        const { title, onSelect } = this.props;
        const { root } = getRoute();

        if (cardId === id) {
            onSelect({id, title});
            console.log('SHOW_MODAL::ON_SELECT', this.props)
        }
    }

    componentWillReceiveProps (nextProps) {
        console.log('componentWillReceiveProps::Card', nextProps);
        // const { id, title } = nextProps.match.params;
        // const { modalType } = nextProps.modal;
        // const { root } = getRoute();
        
        // if (root === 'c' && !modalType && nextProps.history.action === 'POP') {
        //     this.props.onSelect({id, title});
        //     console.log('SHOW_MODAL::ON_RELOAD');
        // }
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
        console.log('showModal->click');
        if (event.target.classList.contains('edit-icon')) {
            this.handeEditInconClick(event);
        } else if (event.target.parentElement.classList.contains('edit-icon')) {
            this.handeEditInconClick(event);
        } else {
            const { id, title, onSelect } = this.props;

            onSelect({id, title});
        }
    }

    render () {
        const { title } = this.props;
        const isEditModalOpen = this.state.isEditModalOpen;

        return (
            <div className = "card-info">
                <Link
                    to = {`/c/${this.props.id}/${title}`}
                    onClick={this.showModal}
                    className = "card"
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
    id: PropTypes.string.isRequired,
    onSelect: PropTypes.func
};

// const mapStateToProps = state => ({modal: state.modal})

const mapDispatchToProps = dispatch => {
    return {
        onSelect: data => dispatch(showCardDetailModal(data))
    };
};

export default withRouter(
    connect(null, mapDispatchToProps)(Card)
);
