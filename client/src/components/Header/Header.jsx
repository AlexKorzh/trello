import React from 'react';
import './header.scss';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <Link to = "/" className = "logo-wrap">
                <img className = "logo" src = {logo} alt = "logo"/>
            </Link>
            <ul className = "nav nav-pills">
                <li className = "nav-item">
                    <Link 
                        className = "btn btn-success" 
                        to = "/signin">Войти</Link>
                </li>
                <li className = "nav-item">
                    <Link 
                        className = "btn btn-success" 
                        to = "/signup">Регистрация</Link>
                </li>
            </ul>
        </header>
    );
};

export default Header;
