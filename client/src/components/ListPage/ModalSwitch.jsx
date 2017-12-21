import React from 'react'
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import ListPage from '../../components/ListPage/ListPage.jsx';

import Modal from '../../components/Modal';

class ModalSwitch extends React.Component {
    previousLocation = this.props.location;
  
    componentWillUpdate (nextProps) {debugger;
        const { location } = this.props
        // set previousLocation if props.location is not modal
        if (
            nextProps.history.action !== 'POP' &&
            (!location.state || !location.state.modal)
        ) {
            this.previousLocation = this.props.location
        }
    }
  
    render () {debugger;
        const { location } = this.props
        const isModal = !!( location.state && location.state.modal && this.previousLocation !== location);
            
        return (
            <div>
                <Switch location={isModal ? this.previousLocation : location}>
                    <Route path='/boards/:id/:title' component={ListPage}/>
                </Switch>
                {isModal ? <Route path='/card/:id/:title' component={Modal} /> : null}
            </div>
        );
    }
}

export default ModalSwitch;
