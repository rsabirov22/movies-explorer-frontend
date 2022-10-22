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
  const [successMessage, setSuccessMessage] = React.useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [savedMovies, setsavedMovies] = React.useState([]);
  const [isNoResults, setIsNoResults] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isShortsOnly, setIsShortsOnly] = React.useState(false);

  // console.log(cards);
  // console.log(savedMovies);
  
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
        
        localStorage.setItem('checked', JSON.stringify(false));

        makeCards(JSON.parse(localStorage.getItem('initialMovies')));

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
      setErrorMessage('');
      setSuccessMessage('Профиль успешно отредактирован.');
      setCurrentUser(res);
    })
    .catch(err => {
      setSuccessMessage('');
      setErrorMessage(err);
    });
  }
  // Переводим полученные фильмы в формат карточки приложения
  function makeCards(initialMovies) {

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

    })
    .catch(err => console.log(err));
  }

  function handleSearch(query) {

    let result =[];

    if (location.pathname === '/movies') {

      localStorage.setItem('searchQuery', JSON.stringify(query));

      if ((query === '' || !query) && !isShortsOnly) {

        localStorage.removeItem('searchResults');
        setIsNoResults(false);
        makeCards(JSON.parse(localStorage.getItem('initialMovies')));

      } else if (query && !isShortsOnly) {

        result = cards.filter(card => card.nameRU.toLowerCase().includes(query.toLowerCase()));
        
        if (result.length === 0) {
          setIsNoResults(true);
        } else {
          setIsNoResults(false);
          localStorage.setItem('searchResults', JSON.stringify(result));
          setCards(result);
        }
      } else if (isShortsOnly && (query === '' || !query)) {

        result = cards.filter(card => card.duration <= 40);
     
        if (result.length === 0) {
          setIsNoResults(true);
        } else {
          setIsNoResults(false);
          localStorage.setItem('searchResults', JSON.stringify(result));
          setCards(result);
        }

      } else if (isShortsOnly && query) {

        result = cards.filter(card => (card.duration <= 40) && (card.nameRU.toLowerCase().includes(query.toLowerCase())));
       
        if (result.length === 0) {
          setIsNoResults(true);
        } else {
          setIsNoResults(false);
          localStorage.setItem('searchResults', JSON.stringify(result));
          setCards(result);
        }

      }

    } else if (location.pathname === '/saved-movies') {

      if ((query === '' || !query) && !isShortsOnly) {

        setIsNoResults(false);
        setsavedMovies(JSON.parse(localStorage.getItem('savedMovies')));

      } else if (query && !isShortsOnly) {
        
        result = savedMovies.filter(card => card.nameRU.toLowerCase().includes(query.toLowerCase()));
        
        if (result.length === 0) {
          setIsNoResults(true);
        } else {
          setIsNoResults(false);
          setsavedMovies(result);
        }
      } else if (isShortsOnly && (query === '' || !query)) {

        result = savedMovies.filter(card => card.duration <= 40);
        
        if (result.length === 0) {
          setIsNoResults(true);
        } else {
          setIsNoResults(false);
          setsavedMovies(result);
        }

      } else if (isShortsOnly && query) {

        result = savedMovies.filter(card => (card.duration <= 40) && (card.nameRU.toLowerCase().includes(query.toLowerCase())));
        
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

    mainApi.deleteMovie(id)
    .then((data) => {

      localStorage.removeItem('savedMovies');
      getSavedCards();
      setsavedMovies(savedMovies.filter(movie => movie._id !== id));
      
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
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('searchResults');
    localStorage.removeItem('checked');
    setLoggedIn(false);
    setIsNoResults(false);
    history.push('/');
  }

  return (
    <div className="page">
      
      <CurrentUserContext.Provider value={currentUser}>

        <Header>
          {location.pathname === '/' && !loggedIn && <div className="header__toolbar">

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
            onShorts={setIsShortsOnly}
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
            successMessage={successMessage}
            errorMessage={errorMessage}
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
            onShorts={setIsShortsOnly}
            savedMovies={savedMovies}
            isMenuOpen={isMenuOpen}
            onClose={onClose}
            onCardDelete={handleCardDelete}
            isLoading={isLoading}
            isNoResults={isNoResults}
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
