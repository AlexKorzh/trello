import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCard } from '../../actions';
import './card.scss';

class Card extends Component {
    constructor () {
        super();
    }
    render () {
        return (
            <div className = "card-info">
                <div className = "card">
                    <div className = "card_title">{this.props.title}</div>
                </div>
            </div>
        );
    }
}


export default Card;
