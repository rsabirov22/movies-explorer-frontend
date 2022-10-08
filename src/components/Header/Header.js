import React from 'react';
import logo from '../../images/header-logo.svg';
import './Header.css';

function Header (props) {

    return (
        <header className="header">
          <div className="page__container">
            <div className="header__container">
              <a className="header__logo-container" href="/">
                <img className="header__logo" src={logo} alt="лого"/> 
              </a>
              <div className="header__authorize">
                <a className="header__signup" href="/signup">Регистрация</a>
                <button className="header__signin" type='button'>Войти</button>
              </div>
            </div>
          </div>
        </header>             
    );
}

export default Header;
