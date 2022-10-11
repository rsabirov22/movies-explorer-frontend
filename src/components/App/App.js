import React, {useState} from "react";
import {Route, Switch, Link, useHistory } from 'react-router-dom';

import Header from "../Header/Header";
import Promo from '../Promo/Promo.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import Footer from '../Footer/Footer.js';
import NavTab from '../NavTab/NavTab.js';
import Navigation from "../Navigation/Navigation";
import './App.css';

function App() {

  const history = useHistory();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function onClose () {
      setIsMenuOpen(false);
  }

  return (
    <div className="page">
      
      <Switch>
        <Route exact={true} path = '/'>

          <Header className="header">
            <div className="header__toolbar">
              <Link className="header__signup" to="/signup">Регистрация</Link>
              <button className="header__signin" type='button'>Войти</button>
            </div>
          </Header>

          <Promo/>

          <NavTab />

          <Main />

          <Footer />

        </Route>

        <Route exact={true} path = '/movies'>

          <Header className="header header_authorized">
            <Navigation 
              isOpen = {isMenuOpen}
              onClose = {onClose}
            />
            <button className='header__menu-btn' type='button' onClick = {()=>setIsMenuOpen(true)}/>
          </Header>

          <Movies />

          <Footer />

        </Route>

        <Route exact={true} path = '/saved-movies'>
          
          <Header className="header header_authorized">
            <Navigation 

            />
          </Header>

          <Movies />

          <Footer />

        </Route>

      </Switch>

    </div>
  );
}

export default App;
