import React, { Component } from 'react';
import './sidebarContainer.scss';
import { connect } from 'react-redux';
import Sidebar from './Sidebar/Sidebar';

import { deleteCardMiddleware } from '../../middlewares/cards';

class SidebarContainer extends Component {
    constructor (props) {
        super(props);
        this.onDeleteCard = this.onDeleteCard.bind(this);
    }

    onDeleteCard (event) {
        const target = event.target;

        if (target.classList.contains('btn-danger')) {
            this.props.onDeleteCard(this.props.card._id);
        }
    }

    render () {
        const list = [
            {
                type: 'danger',
                text: 'Delete'
            }
        ];

        return (
            <div className = "sidebar-container">
                <Sidebar
                    listActions = { list }
                    onClick = {this.onDeleteCard} 
                />
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onDeleteCard: (cardId) => dispatch(deleteCardMiddleware(cardId))
    };
};

export default connect(null, mapDispatchToProps)(SidebarContainer);
