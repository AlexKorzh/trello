import React, { Component } from 'react';
import { connect } from 'react-redux';
import './header.scss';
import * as actions from '../../actions/users';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor (props) {
        super(props);
    }
    renderButtons (config) {
        const { text, btnClass, route, auth, key } = config;
        
        return (
            <li className = "nav-item" key = {key}>
                <Link
                    className = {`btn ${btnClass}`}
                    to = {`/${route}`}>
                    {text}
                </Link>    
            </li>
        );
    }
    render () {
        let btns = [];
        console.log(this.props.authenticated);

        if (!this.props.authenticated) {
            btns.push(this.renderButtons({
                text: 'Войти', 
                btnClass: 'btn-success',
                route: 'signin',
                auth: true,
                key: 1
            }));
            btns.push(this.renderButtons({
                text: 'Регистрация', 
                btnClass: 'btn-success',
                route: 'signup',
                auth: true,
                key: 2
            })); 
        } else {
            btns.push(this.renderButtons({
                text: 'Выйти', 
                btnClass: 'btn-dark',
                route: 'signout',
                auth: false,
                key: 3
            })); 
        }
        return (
            <header className="header">
                <Link to = "/boards" className = "logo-wrap">
                    <img className = "logo" src = {logo} alt = "logo"/>
                </Link>
                <ul className = "nav nav-pills">
                    {
                        btns.map(button => button)
                    }
                </ul>
            </header>
        );
    }
};

function mapStateToProps (state) {
    return { 
        authenticated: state.auth.authenticated 
    }
}

export default connect(mapStateToProps, actions)(Header);
