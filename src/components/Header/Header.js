import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/header-logo.svg';
import './Header.css';

function Header (props) {

    return (
        <header className="header">
          <div className="header__container">
            
            <Link className="header__logo-container" to='/'>
              <img className="header__logo" src={logo} alt="лого"/>
            </Link>
        
            {props.children}

          </div>
        </header>             
    );
}

export default Header;
