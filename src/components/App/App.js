import React, { useState } from "react";
import { Route, Switch, Link, useHistory, useLocation } from 'react-router-dom';
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
import moviesApi from '../../utils/MoviesApi.js'
import mainApi from '../../utils/MainApi.js';
import './App.css';

function App() {
  const history = useHistory();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [savedMovies, setsavedMovies] = React.useState([]);
  const [filteredmovies, setFilteredmovies] = React.useState([]);
  const [isNoResults, setIsNoResults] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  
  // console.log(initialMovies)
  // console.log(savedMovies);
  //  console.log(cards)
  // console.log(isNoResults);

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

  React.useEffect(() => {
    // Загрузка карточек
    if (loggedIn) {

      setIsLoading(true);

      moviesApi.getMovies()
      .then((data) => {

        setIsLoading(false);
        // сохраняем данные с сервера в локальное хранилище
        localStorage.setItem('initialMovies', JSON.stringify(data));
        // сохраняем данные из локального хранилища в стэйт
        setInitialMovies(JSON.parse(localStorage.getItem('initialMovies')));

        makeCards();

        getSavedCards();

      })
      .catch(err => console.log(err));

    } 
    // Загрузка карточек
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
  // Переводим полученные фильмы в формат карточки приложения
  function makeCards() {
    const cards = initialMovies.map((movie) => ({
      movieId: movie.id,
      country: movie.country,
      image: `https://api.nomoreparties.co/${movie.image.url}`,
      description: movie.description,
      duration: movie.duration,
      nameEN: movie.nameEN,
      nameRU: movie.nameRU,
      year: movie.year,
      trailerLink: movie.trailerLink,
      director: movie.director,
      thumbnail: `https://api.nomoreparties.co/${movie.image.url}`
    }));

    setCards(cards);
  }
  
  function getSavedCards() {
    mainApi.getSavedMovies()
    .then((data) => {
      // сохраняем данные с сервера в локальное хранилище
      localStorage.setItem('savedMovies', JSON.stringify(data));
      // сохраняем данные из локального хранилища в стэйт
      setsavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
      // console.log(data);
      // setsavedMovies(data);
    })
    .catch(err => console.log(err));
  }

  function handleSearch(query) {
    // console.log(cards);
    // console.log(query)
    if (location.pathname === '/movies') {

      if (query === '') {
        makeCards();
      } else {
        const result = cards.filter(card => card.nameRU.toLowerCase().includes(query.toLowerCase()));
        // console.log(result);
        if (result.length === 0) {
          setIsNoResults(true);
        } else {
          setIsNoResults(false);
          setCards(result);
        }
      }

    } else if (location.pathname === '/saved-movies') {

      if (query === '') {
        setsavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
      } else {
        const result = savedMovies.filter(card => card.nameRU.toLowerCase().includes(query.toLowerCase()));
        // console.log(result);
        if (result.length === 0) {
          setIsNoResults(true);
        } else {
          setIsNoResults(false);
          setsavedMovies(result);
        }
      }

    }

  }

  function handleCardSave(card) {
    mainApi.postMovie(card)
    .then(() => {
      getSavedCards();
    })
    .catch(err => console.log(err));
  }

  function handleCardDelete(id) {
    // console.log(id)
    mainApi.deleteMovie(id)
    .then((data) => {
      // console.log(data)
      localStorage.removeItem('savedMovies');
      getSavedCards();
      setsavedMovies(savedMovies.filter(movie => movie._id !== id));
      // console.log(savedMovies.filter(movie => movie._id !== id))
    })
    .catch(err => console.log(err));
  }

  function isSaved(card) {
    const result = savedMovies.some((savedMovie) => savedMovie.movieId === card.movieId);
    
    return result; 
  }

  const signOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('initialMovies');
    localStorage.removeItem('savedMovies');
    setLoggedIn(false);
    setIsNoResults(false);
    history.push('/');
  }

  return (
    <div className="page">
      
      <CurrentUserContext.Provider value={currentUser}>

        <Header signOut={signOut}>
          {location.pathname === '/' && <div className="header__toolbar">

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
            isNoResults={isNoResults}
            onClose={onClose}
            onSearch={handleSearch}
            cards={cards}
            onCardSave={handleCardSave}
            isSaved={isSaved}
            isLoading={isLoading}
          >
          </ProtectedRoute>

          <ProtectedRoute
            path='/profile'
            loggedIn={loggedIn}
            component={Profile}
            onEditProfile={onEditProfile}
            isMenuOpen={isMenuOpen}
            onClose={onClose}
            signOut={signOut}
          >
          </ProtectedRoute>

          <ProtectedRoute
            path='/saved-movies'
            loggedIn={loggedIn}
            component={SavedMovies}
            onSearch={handleSearch}
            savedMovies={savedMovies}
            isMenuOpen={isMenuOpen}
            onClose={onClose}
            onCardDelete={handleCardDelete}
            isLoading={isLoading}
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
