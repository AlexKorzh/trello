import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createList } from '../../../actions';

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
        debugger;
        this.props.saveList(title);
    }

    openFrom () {
        this.setState({isOpen: true});      
    }

    closeForm () {
        this.setState({isOpen: false});
    }

    render () {
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

function mapStateToProps (state) {
    return {
        lists: state
    };
}

function mapDispatchToProps (dispatch) {
    return {
        saveList: title => dispatch(createList(title))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLisButton);
