import React, { Component } from 'react';

import Icon from '../Icon';

import './title.scss';

class Title extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isEditAreaOpen: false
        };
        this.handleTitleClick = this.handleTitleClick.bind(this);
        this.handeKeyPress = this.handeKeyPress.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    handleTitleClick () {
        this.textArea.removeAttribute('readonly');
        this.setState({ isEditAreaOpen: true });
    }

    handleCloseClick () {
        this.textArea.value = this.props.title;
        this.setState({ isEditAreaOpen: false });
    }
    
    handeKeyPress (event) {
        if (event.charCode === 13) {
            event.preventDefault();

            const { title, id, updateTitle } = this.props;
            const currentValue = this.textArea.value;

            if (title === currentValue) {
                this.textArea.setAttribute('readonly', '');
                this.setState({ isEditAreaOpen: false });
            } else {
                updateTitle(id, currentValue);
                this.textArea.setAttribute('readonly', '');
                this.setState({ isEditAreaOpen: false });
            }
        }
    }

    render () {
        let editAreaStatus = !this.state.isEditAreaOpen ? 'no-editing' : 'editing';

        return (
            <div className={`title edit-area ${editAreaStatus}`}>
                <textarea
                    className="textarea"
                    ref={(textarea) => { this.textArea = textarea }}
                    defaultValue={this.props.title}
                    onClick = {this.handleTitleClick}
                    onKeyPress = {this.handeKeyPress}
                />
                <Icon
                    className="close"
                    type="button"
                    name="close"
                    onClick={ this.handleCloseClick }
                />
                {/* <button
                    onClick={this.handleCloseClick}
                    type="button"
                    className="close"
                    aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button> */}
            </div>
        );
    }
};

export default Title;
