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

    componentWillUpdate (nextProps) {
        const { location } = this.props;

        // console.log('componentWillUpdate::ListPageRouter->location', this.location); //??
        console.log('componentWillUpdate::ListPageRouter', this.props, nextProps);
        // console.log('componentWillUpdate::ListPageRouter->previousLocation', this.previousLocation);

        if (nextProps.history.action !== 'POP' && !this.props.modal.modalType) {
            this.previousLocation = this.props.location
        } else if (nextProps.history.action === 'POP' && !nextProps.modal.modalType && location) {
            console.log('UP!');
            // this.previousLocation = '/b/5a41399a84887e22e4084c30/sdddddddddddd';
        }
    }
  
    render () {
        console.log('listPageRouter->props', this.props);
        const { location } = this.props;
        const isModal = (() => {
            let isModalOpen = false;

            const isSameLocation = this.previousLocation === location;
            const { modalType } = this.props.modal;

            if (modalType) isModalOpen = !isModalOpen;

            return isModalOpen;
        })();

        return (
            <div>
                <Switch location={isModal ? this.previousLocation : location}>
                    <Route path='/b/:id/:title' component={ListPage}/>
                    <Route path='/c/:id/:title' component={ListPage}/>
                </Switch>
                {isModal ? <Route path='/c/:id/:title' component={Modal} /> : null}
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

export default connect(mapStateToProps, null)(ListPageRouter);
