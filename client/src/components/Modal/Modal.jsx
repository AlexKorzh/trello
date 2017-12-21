import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import './modal.scss';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { hideModal } from '../../actions/modal';
import { CARD_DETAIL_MODAL } from '../../constants/ActionTypes';

import CardDetailModal from './components/cardDetailModal';

const MODAL_COMPONENTS = {
    CARD_DETAIL_MODAL: CardDetailModal
}

class Modal extends Component {
    constructor (props) {
        super(props);

        this.setRef = this.setRef.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeModalEsc = this.closeModalEsc.bind(this);
        this.addEventHandlers = this.addEventHandlers.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.removeEventHandlers = this.removeEventHandlers.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        console.log('nextProps MODAL', nextProps);
    }

    componentDidMount () {
        this.addEventHandlers();
    }
    
    componentWillUnmount () {
        console.log('componentWillUnmount::parent');
        this.removeEventHandlers();
    }

    addEventHandlers () {
        document.addEventListener('keydown', this.closeModalEsc);
        document.addEventListener('click', this.handleOutsideClick);
        window.addEventListener('popstate', this.closeModal);
    }

    removeEventHandlers () {
        document.removeEventListener('keydown', this.closeModalEsc);
        document.removeEventListener('click', this.handleOutsideClick);
        window.addEventListener('popstate', this.closeModal);
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
        // const outsideClick = !this.node.contains(e.target);

        // if (outsideClick) this.closeModal();
    }

    setRef (node) {
        return this.node = node;
    }

    render () {debugger;
        // const { modalType, modalProps } = this.props.modal;

        const { id, title } = this.props.match.params;
       
        // const modalProps = {
        //     id,
        //     title
        // }
        // const modalType = 'CARD_DETAIL_MODAL';

        // const SpecificModal = MODAL_COMPONENTS[modalType];
       
        // const ModalWindow = () => {
        //     return (
        //         <div className = "modal-overlay">
        //             <div
        //                 className="modal-window"
        //                 ref={ this.setRef }
        //             >
        //                 <i
        //                     className="material-icons icon-close modal-icon-close"
        //                     role="button"
        //                     onClick={ this.closeModal }
        //                 >
        //                 close
        //                 </i>
        //                 <SpecificModal {...modalProps} />
        //             </div>
        //         </div>
        //     );
        // }

        const component = id ? <div style = {{position: 'fixed', left: '0px', right: '0px', top: '0px', bottom: '0px', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'  }} 
        className = "modal-window">
        <div style = {{color: 'red'}}>MODAL WINDOW</div>
        </div> : null;

        return (
            // <div className = "modal-window">{ modalType ? <ModalWindow /> : null }</div>
            component
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

// const mapStateToProps = state => ({modal: state.modal})

// const mapDispatchToProps = dispatch => {
//     return {
//         onClose: () => dispatch(hideModal())
//     };
// };

export default withRouter(Modal);
