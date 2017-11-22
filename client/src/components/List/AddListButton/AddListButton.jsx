import React, { Component } from 'react';
import './addListButton.scss';
import { connect } from 'react-redux';
import { createList } from '../../../actions';
import getBoardId from '../../../utils/getBoardId';

class AddLisButton extends Component {
    constructor (props) {
        super(props);
        this.state = {isOpen: false};
        this.openFrom = this.openFrom.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave () {
        const title = this.refs.listTitle.value;
        if (title != '') {
            const boardId = getBoardId();
            
            this.props.saveList(title, boardId);
            this.closeForm();
        } else {
            this.refs.listTitle.placeholder = 'Введите название списка';
        }
    }

    openFrom () {
        this.setState({isOpen: true});      
    }

    closeForm () {
        this.setState({isOpen: false});
    }

    render () {
        console.log(this.props);
        let formStaus = !this.state.isOpen ? 'hide' : 'show';

        return (
            <div className = "add-list-container">
                <span
                    role = "button"
                    onClick = {this.openFrom}
                    className = "add-list-btn">Добавить список...</span>
                <div className = {`add-list-form ${formStaus}`}>
                    <input
                        className = "add-list-form__input" 
                        type = "text"
                        ref = "listTitle" 
                        placeholder = "Добавить список..."/>
                    <div className = "list-controlls">
                        <button 
                            className = "btn btn-success"
                            onClick = {this.handleSave}>Сохранить</button>
                        <button 
                            type="button" 
                            className="close" 
                            aria-label="Close"
                            onClick = {this.closeForm}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>                
        );
    }
};

function mapDispatchToProps (dispatch) {
    return {
        saveList: (title, boardId) => dispatch(createList(title, boardId))
    };
}

export default connect(null, mapDispatchToProps)(AddLisButton);
