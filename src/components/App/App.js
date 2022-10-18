import React, { useState } from "react";
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import * as auth from '../../utils/auth.js';
// import moviesApi from '../utils/moviesApi.js'
import mainApi from '../../utils/MainApi.js';
import './App.css';

function App() {
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    // проверка наличия токена и валидности токена
    if (jwt) {
      
      auth.getUserData(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser({
            id: res._id,
            email: res.email,
            name: res.name
          });
        } else {
          localStorage.removeItem('jwt');
          history.push('/signin');
        }
      })
      .catch(err => console.log(err));

    }
    // проверка наличия токена и валидности токена
  }, [loggedIn]);
  
  function onClose () {
      setIsMenuOpen(false);
  }

  const onRegister = (data) => {
    return auth.register(data.name, data.password, data.email)
    .then((res) => {
      if (res) {
        onLogin(data);
      } else {
        setErrorMessage(res.error);
      }
    })
    .catch(err => {
      setErrorMessage(err);
    });
  }

  const onLogin = (data) => {
    if (data.password && data.email) {
      return auth.authorize(data.password, data.email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          history.push('/movies');
        } else {
          setErrorMessage(data.error);
          console.log(data.error)
        }
      })
      .catch(err => {
        setErrorMessage(err);
      });
    }
  }

  const onEditProfile = (data) => {

    return mainApi.patchProfile(data)
    .then((res) => {
      setCurrentUser(res);
    })
    .catch(err => {
      setErrorMessage(err);
    });

  }

  const signOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/');
  }

  return (
    <div className="page">
      
      <CurrentUserContext.Provider value={currentUser}>

        <Header signOut={signOut}>
          {!loggedIn && <div className="header__toolbar">

            <Link to="/signup" className="header__signup">Регистрация</Link>
            <Link to="/signin" className="header__signin" type='button'>Войти</Link>

          </div>}
          {loggedIn && <Navigation className="navigation navigation_desktop"/>}
          {loggedIn && <button className='header__menu-btn' type='button' onClick = {()=>setIsMenuOpen(true)}/>}
        </Header>

        <Switch>

          <Route exact={true} path='/'>

            <Main />

          </Route>

          <Route path='/signup'>

            <Register 
              onRegister={onRegister}
              errorMessage={errorMessage}
            />
            
          </Route>

          <Route path='/signin'>

            <Login
              onLogin={onLogin}
              errorMessage={errorMessage}
            />

          </Route>

          <ProtectedRoute
            path='/movies'
            loggedIn={loggedIn}
            component={Movies}
            isMenuOpen={isMenuOpen}
            onClose={onClose}
          >
          </ProtectedRoute>

          <ProtectedRoute
            path='/profile'
            loggedIn={loggedIn}
            component={Profile}
            onEditProfile={onEditProfile}
            isMenuOpen={isMenuOpen}
            onClose={onClose}
          >
          </ProtectedRoute>

          <ProtectedRoute
            path='/saved-movies'
            loggedIn={loggedIn}
            component={SavedMovies}
            isMenuOpen={isMenuOpen}
            onClose={onClose}
          >
          </ProtectedRoute>

          <Route path='/error'>

            <NotFound />

          </Route>

        </Switch>

        <Footer />

      </CurrentUserContext.Provider>
    
    </div>
  );
}

export default App;
