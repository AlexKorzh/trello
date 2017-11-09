import React, { Component } from 'react';
import { connect } from 'react-redux';
import './header.scss';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor () {
        super();
    }
    renderButtons (config) {
        const { text, btnClass, route, key} = config;
        
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

        if (this.props.auth) {
            btns.push(this.renderButtons({
                text: 'Войти', 
                btnClass: 'btn-success',
                route: 'signin',
                key: 1
            }));
            btns.push(this.renderButtons({
                text: 'Регистрация', 
                btnClass: 'btn-success',
                route: 'signup',
                key: 2
            })); 
        }
        return (
            <header className="header">
                <Link to = "/" className = "logo-wrap">
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
        auth: state.auth
    };
}

export default connect(mapStateToProps, null)(Header);
