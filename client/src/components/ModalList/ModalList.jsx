import React, { Component } from 'react';
import './modalList.scss';

class ModalList extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        let modalStatus = this.props.status ? 'show' : 'hide',
            modalPosition = {};

        if (this.props.modalPosition) {
            let { left, top, height, viewPortDiff = ''} = this.props.modalPosition;

            modalPosition = {
                left: left + 'px',
                top: top + height - viewPortDiff + 'px',
                position: 'fixed'
            };
        }

        return (
            <div style = {modalPosition} className = {`modal-list ${modalStatus}`}>
                <h2 className = "modal-list__head">
                    {this.props.title}
                    <button 
                        type = "tab" 
                        className = "close" 
                        aria-label = "Close"
                        onClick = {this.props.close}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </h2>
                <div className = "modal-list__items">
                     {/* {
                    this.props.list.map((item) => item)
                } */}
                </div>
                <div className = "button-wrap">
                    <button 
                        className = "modal-list__button btn btn-danger"
                        onClick = {this.props.delete}
                    >
                        {this.props.buttonText}
                    </button>
                </div>
            </div>
        );
    }
};

export default ModalList;
