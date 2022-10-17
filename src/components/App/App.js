import React, {useState} from "react";
import {Route, Switch, Link, useHistory } from 'react-router-dom';

import Header from "../Header/Header";
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Footer from '../Footer/Footer.js';
import Navigation from "../Navigation/Navigation";
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import NotFound from "../NotFound/NotFound.js";
import * as auth from '../../utils/auth.js';
// import moviesApi from '../utils/moviesApi.js'
// import mainApi from '../../utils/mainApi.js';
import './App.css';

function App() {
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  
  function onClose () {
      setIsMenuOpen(false);
  }

  const onRegister = (data) => {
    return auth.register(data.name, data.password, data.email)
    .then((res) => {
      if (res) {
        console.log(data);
      } else {
        setErrorMessage(res.error);
      }
    })
    .catch(err => {
      setErrorMessage(err);
    });
  }

  return (
    <div className="page">
      
      <Switch>
        <Route exact={true} path='/'>

          <Header>
            <div className="header__toolbar">
              <Link to="/signup" className="header__signup">Регистрация</Link>
              <Link to="/signin" className="header__signin" type='button'>Войти</Link>
            </div>
          </Header>

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

          <Register 
            onRegister={onRegister}
            errorMessage={errorMessage}
          />
          
        </Route>

        <Route path='/signin'>

          <Login />

        </Route>

        <Route path='/error'>

          <NotFound />

        </Route>

      </Switch>

    </div>
  );
}

export default App;
