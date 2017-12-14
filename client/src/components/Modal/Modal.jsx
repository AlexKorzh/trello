import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { hideModal } from '../../actions/modal';
import { CARD_DETAIL_MODAL } from '../../constants/ActionTypes';

import CardDetailModal from './components/cardDetailModal';

import './modal.scss';

const MODAL_COMPONENTS = {
    CARD_DETAIL_MODAL: CardDetailModal
}

class Modal extends Component {
    constructor () {
        super();

        this.setRef = this.setRef.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeModalEsc = this.closeModalEsc.bind(this);
        this.addEventHandlers = this.addEventHandlers.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.removeEventHandlers = this.removeEventHandlers.bind(this);
    }

    componentDidMount () {
        this.addEventHandlers();
    }
    
    componentWillUnmount () {
        this.removeEventHandlers();
    }

    addEventHandlers () {
        document.addEventListener('keydown', this.closeModalEsc);
        document.addEventListener('click', this.handleOutsideClick);
    }

    removeEventHandlers () {
        document.removeEventListener('keydown', this.closeModalEsc);
        document.removeEventListener('click', this.handleOutsideClick);
    }

    closeModal () {
        const close = this.props.onClose;

        close();
    }

    closeModalEsc (e) {
        const esc = e.which === 27;

        if (esc) this.closeModal();
    }

    handleOutsideClick (e) {
        const outsideClick = !this.node.contains(e.target);

        if (outsideClick) this.closeModal();
    }

    setRef (node) {
        return this.node = node;
    }

    render () {
        const { modalType, modalProps } = this.props.modal;
        const SpecificModal = MODAL_COMPONENTS[modalType];

        const ModalWindow = () => {
            return (
                <div
                    className="modal-window"
                    ref={ this.setRef }
                >
                    <i
                        className="material-icons icon-close modal-icon-close"
                        role="button"
                        onClick={ this.closeModal }
                    >
                        close
                    </i>
                    <SpecificModal {...modalProps} />
                </div>
            );
        }

        return (
            <div className={`modal-overlay ${modalType ? 'hidden' : ''}`}>
                { modalType ? <ModalWindow /> : null }
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    modal: PropTypes.shape({
        modalType: PropTypes.string,
        modalProps: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.object
        ])
    })
};

const mapStateToProps = state => ({modal: state.modal})

const mapDispatchToProps = dispatch => {
    return {
        onClose: () => dispatch(hideModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
