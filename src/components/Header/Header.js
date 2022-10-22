import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/header-logo.svg';
import './Header.css';

function Header (props) {

  const location = useLocation();

  return (
      <header className={location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/error' ? 'header header_none' : 'header'}>
        <div className="page__container">
          <div className="header__container">
            
            <Link className="header__logo-container" to='/'>
              <img className="header__logo" src={logo} alt="лого"/>
            </Link>
        
            {props.children}

          </div>
        </div>
      </header>             
  );
}

export default Header;
