import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './modal.scss';

class Modal extends Component {
    constructor (props) {
        super(props);

        this.state = {
            isOpen: false
        };

        // this.setNode = this.setNode.bind(this);
        // this.closeModal = this.closeModal.bind(this);
        // this.closeModalEsc = this.closeModalEsc.bind(this);
        // this.addEventHandler = this.addEventHandler.bind(this);
        // this.removeEventHandler = this.removeEventHandler.bind(this);
    }

    // componentWillReceiveProps (nextProps) {
    //     const isOpen = nextProps.isOpen;

    //     this.setState({modalIsOpen: nextProps.isOpen});

    //     isOpen ? this.addEventHandler() : this.removeEventHandler();
    // }

    addEventHandler () {
        document.addEventListener('keydown', this.closeModalEsc);
    }

    removeEventHandler () {
        document.removeEventListener('keydown', this.closeModalEsc);
    }

    // closeModal (e) {
    //     const closeModal = this.props.close;

    //     this.setState({modalIsOpen: false});

    //     closeModal();
    // }

    closeModalEsc (e) {
        const esc = e.which === 27;

        // if (esc) {
        //     const closeModal = this.props.close;

        //     this.setState({modalIsOpen: false});

        //     closeModal();
        // }
    }

    // setNode (node) {
    //     this.node = node;
    // }
    render () {
        
        // const isOpen = this.state.modalIsOpen;

        // const Default = () => {
        //     return (
        //         <div className={`modal-overlay ${!isOpen && "hidden"}`}>
        //             {
        //                 isOpen &&
        //                 <div
        //                     className="modal-wrapper" 
        //                     ref={this.setNode}
        //                 >
        //                     <div className="close-icon_wrapper">
        //                         <FontIcon
        //                             className="material-icons close-icon"
        //                             style = {iconStyleClose}
        //                             onClick = {this.closeModal}
        //                         >
        //                             close
        //                         </FontIcon>
        //                     </div>
        //                     {this.props.children}
        //                 </div>
        //             }
        //         </div>
        //     );
        // }

        // const Next = () => {
        //     return (
        //         <div className={`modal-overlay next ${!isOpen && "hidden"}`}>
        //             {
        //                 isOpen &&
        //                 <div
        //                     className="modal-wrapper" 
        //                     ref={this.setNode}
        //                 >
        //                     <div className="modal-header">
        //                         <h4 className="modal-header_headline">{ this.props.headline }</h4>
        //                         <FontIcon
        //                             className="material-icons close-icon"
        //                             style = {iconStyle}
        //                             onClick = {this.closeModal}
        //                         >
        //                             close
        //                         </FontIcon>
        //                     </div>
        //                     <div className="modal-content">
        //                         { this.props.children }
        //                     </div>
        //                 </div>
        //             }
        //         </div>
        //     );
        // }

        return (
            <div className="modal-overlay">Modal</div>
        );
    }
}

// Modal.propTypes = {
//     isOpen: PropTypes.bool.isRequired,
//     close: PropTypes.func,
//     children: PropTypes.node
// };

export default Modal;
