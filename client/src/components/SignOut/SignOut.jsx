import React, { Component } from 'react';
import './signOut.scss';
import { connect } from 'react-redux';
import * as actions from '../../middlewares/users';
import Header from '../../components/Header/Header.jsx';

class SignOut extends Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {
        this.props.signoutUser();
    }

    render () {
        return (
            <div className = "signout-page">
                <Header />
                <div className = "signout-page__text">Sorry to see you go... :(</div>
            </div>
        );
    }
}

export default connect(null, actions)(SignOut);
