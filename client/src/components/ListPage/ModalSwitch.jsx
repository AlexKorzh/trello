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
    constructor (props) {debugger;
        super(props);

        this.previousLocation = this.props.location;
        this.action = this.props.history.action;
    }

    componentWillMount () {
        console.clear();
        console.log('componentWillMount', this.action);
    }
  
    componentWillUpdate (nextProps) {debugger;
        const { location } = this.props
        // set previousLocation if props.location is not modal
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

export default ModalSwitch;
