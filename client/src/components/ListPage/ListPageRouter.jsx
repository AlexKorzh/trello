import React, { Component } from 'react';
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
console.log('componentWillUpdate::ListPageRouter', nextProps);
        if (nextProps.history.action !== 'POP' && (!location.state || !location.state.modal)) {
            this.previousLocation = this.props.location
        }
    }
  
    render () {debugger;

        console.log('props -> ', this.props);
        const { location } = this.props
        const isModal = !!( location.state && location.state.modal && this.previousLocation !== location);
            
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

export default ListPageRouter;
