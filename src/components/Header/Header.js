import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/header-logo.svg';
import logoAlternative from '../../images/logo-alternative.svg';
import './Header.css';

function Header (props) {

    return (
        <header className={props.className}>
          <div className="page__container">
            <div className="header__container">
              
              {!props.loggedIn && <Link className="header__logo-container" to='/'>
                <img className="header__logo" src={logo} alt="лого"/>
              </Link>}

              {props.loggedIn && <Link className="header__logo-container" to='/'>
                <img className="header__logo" src={logoAlternative} alt="лого"/>
              </Link>}
              
              {props.children}

            </div>
          </div>
        </header>             
    );
}

export default Header;
