import React from 'react';
import './header.scss';
import logo from '../../images/logo.png';

const Header = () => {
    return (
        <header className="header">
            <a className = "logo-wrap" href = "#">
                <img className = "logo" src = {logo} alt = "logo"/>
            </a>
        </header>
    );
};

export default Header;
