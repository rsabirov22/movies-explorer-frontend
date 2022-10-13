import React, {useState} from "react";
import {Route, Switch, Link } from 'react-router-dom';

import Header from "../Header/Header";
import Promo from '../Promo/Promo.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Footer from '../Footer/Footer.js';
import Navigation from "../Navigation/Navigation";
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import NotFound from "../NotFound/NotFound.js";
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function onClose () {
      setIsMenuOpen(false);
  }

  return (
    <div className="page">
      
      <div className="page__container">

        <Switch>
          <Route exact={true} path='/'>

            <Header>
              <div className="header__toolbar">
                <Link className="header__signup" to="/signup">Регистрация</Link>
                <button className="header__signin" type='button'>Войти</button>
              </div>
            </Header>

            <Promo/>

            <Main />

            <Footer />

          </Route>

          <Route exact={true} path='/movies'>

            <Header>

              <Navigation className="navigation navigation_desktop"/>

              <button className='header__menu-btn' type='button' onClick = {()=>setIsMenuOpen(true)}/>

            </Header>

            <Movies />

            <Footer />

            <Navigation
              className="navigation navigation_mobile"
              isOpen={isMenuOpen}
              onClose={onClose}
            />

          </Route>

          <Route exact={true} path='/saved-movies'>
            
            <Header>

              <Navigation className="navigation navigation_desktop"/>

              <button className='header__menu-btn' type='button' onClick = {()=>setIsMenuOpen(true)}/>

            </Header>

            <SavedMovies />

            <Footer />

            <Navigation
              className="navigation navigation_mobile"
              isOpen={isMenuOpen}
              onClose={onClose}
            />

          </Route>

          <Route exact={true} path='/profile'>
            
            <Header>

              <Navigation className="navigation navigation_desktop"/>

              <button className='header__menu-btn' type='button' onClick = {()=>setIsMenuOpen(true)}/>

            </Header>

            <Profile />

            <Navigation
              className="navigation navigation_mobile"
              isOpen={isMenuOpen}
              onClose={onClose}
            />

          </Route>

          <Route path='/signup'>

            <Register />
            
          </Route>

          <Route path='/signin'>

            <Login />

          </Route>

          <Route path='/error'>

            <NotFound />

          </Route>

        </Switch>
        
      </div>

    </div>
  );
}

export default App;
