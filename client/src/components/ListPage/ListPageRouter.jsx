import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import history from '../../utils/history';
import ListPage from './ListPage.jsx';
import Modal from '../Modal';

import getRoute from '../../utils/getRoute';

import { hideModal } from '../../actions/modal';

class ListPageRouter extends Component {
    previousLocation = this.props.location;

    // componentWillUpdate (nextProps) {
    //     const { location } = this.props
    //     console.log('componentWillUpdate::ListPageRouter', {
    //         'this.props': this.props,
    //         'nextProps': nextProps,
    //         'previousLocation': this.previousLocation,
    //         'currentLocation': this.props.location,
    //         'nextPropsLocation': nextProps.location
    //     })
    //     if (nextProps.history.action !== 'POP' &&
    //         !this.props.modal.modalType && nextProps.modal.flag != 'click') {

    //         this.previousLocation = this.props.location
    //     } else if (nextProps.history.action === 'POP' && !nextProps.modal.modalType && nextProps.modal.flag === 'click') {
    //         // this.previousLocation = {
    //         //     pathname: `/b/${this.props.board.id}/${this.props.board.title}`
    //         // }

    //         history.push(`/b/${this.props.board.id}/${this.props.board.title}`)

    //         // this.goBack = !this.goBack;
    //     }
    // }

    componentWillUpdate (nextProps) {
        if (nextProps.history.action !== 'POP' &&
            !this.props.modal.modalType) {
            this.previousLocation = this.props.location
        }
        console.log('componentWillUpdate::ListPageRouter', {
            'previousLocation': this.previousLocation,
            'nextProps': nextProps.location,
            'history': nextProps.history,
            'MODAL_STATUS': nextProps.modal
        })
        if (nextProps.history.action === 'POP' &&
        this.props.modal.modalType) {
            this.props.closeModal();
        }

        const { root } = getRoute();

        // if (root === 'c' && nextProps.history.action != 'POP' &&
        // !this.props.modal.modalType) {
        //     history.push('/asdasdad')
        // }
    }

    // componentWillUpdate (nextProps, nextState) {
    //     const { location } = this.props;

    //     // console.log('componentWillUpdate::ListPageRouter->location', this.location); //??
    //     console.log('componentWillUpdate::ListPageRouter', this.props, nextProps, nextState);
    //     // console.log('componentWillUpdate::ListPageRouter->previousLocation', this.previousLocation);

    //     if (nextProps.history.action !== 'POP' && !this.props.modal.modalType) {
    //         this.setState({
    //             previousLocation: nextProps.location
    //         });
    //     } else if (nextProps.history.action === 'POP' && !nextProps.modal.modalType && location) {
    //         console.log('UP!');
    //     }
    // }

    // componentWillUpdate (nextProps) {

    //     console.log(nextProps.location === this.props.location);
    //     console.log('componentWillUpdate::ListPageRouter', {
    //         state: this.state.previousLocation,
    //         props: this.props.location,
    //         nextProps: nextProps.location,
    //         history: nextProps.history
    //     });

    //     if (nextProps.history.action != 'POP' && !this.props.modal.modalType && nextProps.location != this.props.location) {
    //         console.log('condition');
    //                 this.setState({
    //                     previousLocation: nextProps.location
    //                 });
    //             }
    // }
  
    render () {
        // console.log('render::ListPageRouter');
        const { location } = this.props;

        const isModal = (() => {
            let isModalOpen = false;

            const { modalType } = this.props.modal;

            if (modalType) isModalOpen = !isModalOpen;

            return isModalOpen;
        })();

        // const currentLocation = (() => {
        //     let path = {};

        //     if (isModal && !this.goBack) {
        //         path = this.previousLocation;
        //     } else if (!isModal && !this.goBack) {
        //         path = location;
        //     } else if (!isModal && this.goBack) {
        //         path = this.previousLocation;
        //     }

        //     return path;
        // })();
        // console.log('T=E=S=T', {
        //     'isModal': isModal,
        //     'this.previousLocation': this.previousLocation,
        //     'location': location,
        //     'currentLocation': currentLocation,
        //     'LOCATION': document.location
        // })
        return (
            <div>
                <Switch

                >
                    <Route path='/b/:id/:title' component={ListPage}/>
                    <Route path='/c/:id/:title' component={ListPage}/>
                </Switch>
                {
                    // isModal ?
                    //     <Route path='/c/:id/:title' component={Modal} /> : null
                }
            </div>
        );
    }
}

ListPageRouter.propTypes = {
    location: PropTypes.shape({}),
    history: PropTypes.shape({
        action: PropTypes.string
    }),
    modal: PropTypes.shape({
        modalType: PropTypes.string
    }),
    fetchData: PropTypes.func
};

const mapStateToProps = state => ({
    modal: state.modal,
    board: {
        id: state.boardId,
        title: state.title
    }
});

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(hideModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPageRouter);
