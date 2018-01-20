import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import './modal.scss';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { hideModal } from '../../actions/modal';
import { hideModalManual } from '../../actions/modal';

import { CARD_DETAIL_MODAL } from '../../constants/ActionTypes';

import CardDetailModal from './components/cardDetailModal';

const MODAL_COMPONENTS = {
    CARD_DETAIL_MODAL: CardDetailModal
}

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
    constructor (props) {
        super(props);

        this.el = document.createElement('div');

        this.setRef = this.setRef.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeModalManual = this.closeModalManual.bind(this);
        this.closeModalEsc = this.closeModalEsc.bind(this);
        this.addEventHandlers = this.addEventHandlers.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.removeEventHandlers = this.removeEventHandlers.bind(this);
    }

    componentDidMount () {
        modalRoot.appendChild(this.el);
        this.addEventHandlers(); 
    }
    
    componentWillUnmount () {
        modalRoot.removeChild(this.el);
        this.removeEventHandlers();
    }

    // componentWillReceiveProps (nextProps) {
    //     const { modalType } = nextProps.modal;

    //     modalType ? this.addEventHandlers() : this.removeEventHandlers();
    //     console.log('componentWillReceiveProps::modal', nextProps);
    // }

    addEventHandlers () {
        document.addEventListener('keydown', this.closeModalEsc);
        document.addEventListener('click', this.handleOutsideClick);
    }

    removeEventHandlers () {
        document.removeEventListener('keydown', this.closeModalEsc);
        document.removeEventListener('click', this.handleOutsideClick);
    }

    closeModal () {
        this.props.onClose();
    }

    closeModalManual () {
        this.props.onCloseManual();
    }

    closeModalEsc (e) {
        const esc = e.which === 27;

        if (esc) this.closeModal();
    }

    handleOutsideClick (e) {
        const outsideClick = e.target.classList.contains('modal-overlay');

        if (outsideClick) this.closeModal();
    }

    setRef (node) {
        return this.node = node;
    }

    render () {
        const { id, title } = this.props.modal.modalProps;
       
        const modalProps = {
            id,
            title
        }
        const modalType = 'CARD_DETAIL_MODAL';

        const SpecificModal = MODAL_COMPONENTS[modalType];
       
        const ModalWindow = () => {
            return (
                <div className = "modal-overlay">
                    <div
                        className="modal-window"
                        ref={ this.setRef }
                    >
                        <i
                            className="material-icons icon-close modal-icon-close"
                            role="button"
                            onClick={ this.closeModalManual }
                        >
                        close
                        </i>
                        <SpecificModal {...modalProps} />
                    </div>
                </div>
            );
        }
        
        return ReactDOM.createPortal(
            this.props.modal.modalType ? 
                <div className = "modal-window">
                    <ModalWindow />
                </div> : null,
            this.el
        );
    }
    
}

// Modal.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     modal: PropTypes.shape({
//         modalType: PropTypes.string,
//         modalProps: PropTypes.oneOfType([
//             PropTypes.string,
//             PropTypes.number,
//             PropTypes.object
//         ])
//     })
// };

const mapStateToProps = state => ({
    modal: state.modal
})

const mapDispatchToProps = dispatch => {
    return {
        onClose: () => dispatch(hideModal()),
        onCloseManual: () => dispatch(hideModalManual())
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Modal)
);
