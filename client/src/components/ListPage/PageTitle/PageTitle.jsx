import React, { Component } from 'react';
import TitleForm from '../../TitleForm/TitleForm.jsx';
import '../../TitleForm/titleForm.scss';
import { connect } from 'react-redux';
import { updateBoardMiddleware } from '../../../actions/boards';
import getBoardId from '../../../utils/getBoardId';
import browserHistory from '../../../utils/history';

class PageTitle extends Component {
    constructor () {
        super();
        this.state = {
            title: '',
            isFormOpen: false
        };
        this.changeTitle = this.changeTitle.bind(this);
        this.getTitle = this.getTitle.bind(this);
        this.openForm = this.openForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }
    componentWillReceiveProps (nextProps) {
        const title = this.state.title;
        const boardId = getBoardId();

        if (!nextProps.isFetching) {
            browserHistory.push(`/boards/${boardId}/${title}`);
        }
    }
    componentDidMount () {
        const title = this.getTitle();

        this.setState({title});
    }
    changeTitle () {
        const title = this.state.title;
        const currentValue = this.formInput.value;

        if (title === currentValue)  {
            this.formInput = ''; 
            this.closeForm();
        } else {
            const boardId = getBoardId();
            
            this.props.onUpdateBoardTitle(boardId, currentValue);
            this.setState({title: currentValue});
            this.closeForm(); 
        }
    }
    getTitle () {
        const URL = window.location.href;
        let title = '',
            url = URL.split('/');
    
        title = url[url.length - 1];
        
        return title;
    }
    openForm () {
        this.setState({isFormOpen: true});
    }
    closeForm () {
        this.setState({isFormOpen: false});
    }
    render () {
        const isOpen = this.state.isFormOpen;
        const title = this.state.title;
        
        return (
            <div className = "list-page__title-wrap">
                <h2 
                    onClick = {this.openForm} 
                    className = "list-page__title">{title}
                </h2>
                <div className = "list-page__form-wrap">
                    {
                        isOpen ? 
                            <TitleForm
                                inputRef={(input) => this.formInput = input} 
                                show = {isOpen} 
                                close = {this.closeForm}
                                formTitle = 'Переименование доски'
                                pageTitle = {title}
                                buttonTitle = 'Переименовать'
                                changeTitle = {this.changeTitle} 
                            /> : null
                    }
                </div>
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateBoardTitle: (boardId, title) => {
            dispatch(updateBoardMiddleware(boardId, title))
        }
    };
};

export default connect(null, mapDispatchToProps)(PageTitle);
