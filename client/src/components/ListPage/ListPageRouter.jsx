import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import ListPage from './ListPage.jsx';
import Modal from '../Modal';

class ListPageRouter extends Component {
    previousLocation = this.props.location;

    componentWillUpdate (nextProps) {
        const { location } = this.props
        console.log('componentWillUpdate::ListPageRouter', {
            'this.props': this.props,
            'nextProps': nextProps,
            'previousLocation': this.previousLocation,
            'currentLocation': this.props.location,
            'nextPropsLocation': nextProps.location
        })
        if (nextProps.history.action !== 'POP' &&
            !this.props.modal.modalType) {

            this.previousLocation = this.props.location
        } else if (nextProps.history.action === 'POP' && !nextProps.modal.modalType && (this.props.location.key === nextProps.location.key)) {
            console.log('is same location: ', '<!-(^^)-!>')
        }
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

    // shouldComponentUpdate (nextProps) {
    //     // let ret = true;
    //     // if (nextProps.location.pathname === this.previousLocation.pathname && this.props.modal.modalType) {
    //     //     ret = false;
    //     // }
    //     // console.log('shouldComponentUpdate', nextProps.location.pathname, this.previousLocation);
    //     // return ret;
    // }
  
    render () {
        console.log('render::ListPageRouter');
        const { location } = this.props;

        const isModal = (() => {
            let isModalOpen = false;

            const { modalType } = this.props.modal;

            if (modalType) isModalOpen = !isModalOpen;

            return isModalOpen;
        })();

        const currentLocation = (() => {

        })();

        return (
            <div>
                <Switch
                    location={isModal ? this.previousLocation : location}
                >
                    <Route path='/b/:id/:title' component={ListPage}/>
                    <Route path='/c/:id/:title' component={ListPage}/>
                </Switch>
                {
                    isModal ?
                        <Route path='/c/:id/:title' component={Modal} /> : null
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

const mapStateToProps = state => ({modal: state.modal});

export default connect(mapStateToProps, null)(ListPageRouter);
