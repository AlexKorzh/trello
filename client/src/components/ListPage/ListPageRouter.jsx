import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import ListPage from './ListPage.jsx';
import Modal from '../Modal';

class ListPageRouter extends Component {
    constructor (props) {
        super(props);

        this.previousLocation = this.props.location;
        this.action = this.props.history.action;
    }

    componentWillMount () {
        console.log('componentWillMount::ListPageRouter', this.location);
    }

    componentWillUpdate (nextProps) {
        const { location } = this.props;

        console.log('componentWillUpdate::ListPageRouter->location', this.location); //??
        console.log('componentWillUpdate::ListPageRouter', nextProps);
        console.log('componentWillUpdate::ListPageRouter->previousLocation', this.previousLocation);

        if (nextProps.history.action !== 'POP' && !this.props.modal.modalType) {
            this.previousLocation = this.props.location
        } else if (nextProps.history.action === 'POP' && !nextProps.modal.modalType && location) {
            console.log('UP!');
            // this.previousLocation = '/b/5a41399a84887e22e4084c30/sdddddddddddd';
        }
    }
  
    render () {

        console.log('listPageRouter->props', this.props);
        console.log('listPageRouter->previousLocation', this.previousLocation);
        const { location } = this.props;
        const _isModal = (() => {
            let isModalOpen = false;

            const isSameLocation = this.previousLocation === location;
            const { modalType } = this.props.modal;

            if (modalType) isModalOpen = !isModalOpen;


            return isModalOpen;
        })();

        const isModal = !!(this.props.modal.modalType && this.previousLocation !== location);
        console.log('listPageRouter->isModal', isModal); 
        console.log('((((listPageRouter->_isModal))))', _isModal); 
        return (
            <div>
                <Switch location={_isModal ? this.previousLocation : location}>
                    <Route path='/b/:id/:title' component={ListPage}/>
                    <Route path='/c/:id/:title' component={ListPage}/>
                </Switch>
                {_isModal ? <Route path='/c/:id/:title' component={Modal} /> : null}
            </div>
        );
    }
}

ListPageRouter.propTypes = {
    location: PropTypes.shape({}),
    history: PropTypes.shape({
        action: PropTypes.string
    }),
    fetchData: PropTypes.func
};

const mapStateToProps = state => ({modal: state.modal});

const mapDispatchToProps = dispatch => {
    return {
        onClose: () => dispatch(hideModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPageRouter);
