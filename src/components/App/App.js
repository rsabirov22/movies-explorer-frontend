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
  const [isNoResults, setIsNoResults] = React.useState(false);
  const [isShortsOnly, setIsShortsOnly] = React.useState(false);
  // Карточки
  const [initialCards, setInitialCards] = React.useState([]);
  const [filteredInitialCards, setFilteredInitialCards] = React.useState([]);
  const [savedCards, setSavedCards] = React.useState([]);
  const [filteredSavedCards, setFilteredSavedCards] = React.useState([]);
  

  // console.log(cards);
  // console.log(savedMovies);
  // console.log(successMessage);
  // console.log(errorMessage);
  //  console.log(currentUser);
  //  console.log(savedCards);
  // console.log('state cards', filteredInitialCards)
  // console.log(isNoResults);
  // console.log(loggedIn);
  
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
    if (loggedIn) {
      history.push('/movies');
    }
  }, [loggedIn])

  React.useEffect(() => {
    // Загрузка карточек
    if (loggedIn) {

      moviesApi.getMovies()
      .then((data) => {

        // сохраняем данные с сервера в локальное хранилище
        localStorage.setItem('initialMovies', JSON.stringify(data));
        
        makeCards(JSON.parse(localStorage.getItem('initialMovies')));
        
      })
      .catch(err => console.log(err));

      getSavedCards();

    }
    // Загрузка карточек
  }, [loggedIn]);

  // React.useEffect(() => {

  //   const storageCards = JSON.parse(localStorage.getItem('searchResults'));

  //   // console.log('storage cards', storageCards)

  //   if (loggedIn && ((storageCards && storageCards.length > 0) || (storageCards && storageCards.length === 0))) {
  //     setFilteredInitialCards(storageCards);
  //     setInitialCards(storageCards);
  //   }
    
  // }, [location]);
  
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

    setInitialCards(cards);

  }

  function getSavedCards() {

    mainApi.getSavedMovies()
    .then((data) => {
      
      setSavedCards(data.reverse());

    })
    .catch(err => console.log(err));

  }
  // Функция поиска
  function handleSearch(query) {

    let result =[];

    if (location.pathname === '/movies') {

      localStorage.setItem('searchQuery', query);
      localStorage.setItem('checked', isShortsOnly);


      if ((query === '' || !query) && !isShortsOnly) {

        setIsNoResults(false);
        setFilteredInitialCards([]);
        localStorage.removeItem('searchResults');
        makeCards(JSON.parse(localStorage.getItem('initialMovies')));

      } else if (query && !isShortsOnly) {

        result = initialCards.filter(card => card.nameRU.toLowerCase().includes(query.toLowerCase()));
        
        if (result.length === 0) {
          setIsNoResults(true);
          setFilteredInitialCards([]);
          localStorage.setItem('searchResults', JSON.stringify(result));
        } else {
          setIsNoResults(false);
          localStorage.setItem('searchResults', JSON.stringify(result));
          setFilteredInitialCards(result);
        }
      } else if (isShortsOnly && (query === '' || !query)) {

        result = initialCards.filter(card => card.duration <= 40);
     
        if (result.length === 0) {
          setIsNoResults(true);
          setFilteredInitialCards([]);
          localStorage.setItem('searchResults', JSON.stringify(result));
        } else {
          setIsNoResults(false);
          localStorage.setItem('searchResults', JSON.stringify(result));
          setFilteredInitialCards(result);
        }

      } else if (isShortsOnly && query) {

        result = initialCards.filter(card => (card.duration <= 40) && (card.nameRU.toLowerCase().includes(query.toLowerCase())));
       
        if (result.length === 0) {
          setIsNoResults(true);
          setFilteredInitialCards([]);
          localStorage.setItem('searchResults', JSON.stringify(result));
        } else {
          setIsNoResults(false);
          localStorage.setItem('searchResults', JSON.stringify(result));
          setFilteredInitialCards(result);
        }

      }

    } else if (location.pathname === '/saved-movies') {

      if ((query === '' || !query) && !isShortsOnly) {

        setIsNoResults(false);
        setFilteredSavedCards([]);
        getSavedCards();

      } else if (query && !isShortsOnly) {
        
        result = savedCards.filter(card => card.nameRU.toLowerCase().includes(query.toLowerCase()));
        
        if (result.length === 0) {
          setIsNoResults(true);
          setFilteredSavedCards([]);
        } else {
          setIsNoResults(false);
          setFilteredSavedCards(result);
        }
      } else if (isShortsOnly && (query === '' || !query)) {

        result = savedCards.filter(card => card.duration <= 40);
        
        if (result.length === 0) {
          setIsNoResults(true);
          setFilteredSavedCards([]);
        } else {
          setIsNoResults(false);
          setFilteredSavedCards(result);
        }

      } else if (isShortsOnly && query) {

        result = savedCards.filter(card => (card.duration <= 40) && (card.nameRU.toLowerCase().includes(query.toLowerCase())));
        
        if (result.length === 0) {
          setIsNoResults(true);
          setFilteredSavedCards([]);
        } else {
          setIsNoResults(false);
          setFilteredSavedCards(result);
        }

      }

    }

  }

  function handleCardSave(card) {
    mainApi.postMovie(card)
    .then((data) => {
      setSavedCards([data, ...savedCards]);
    })
    .catch(err => console.log(err));
  }

  function handleCardDelete(id) {

    mainApi.deleteMovie(id)
    .then((data) => {

      const result = savedCards.filter(savedCard => savedCard._id !== id);
      setSavedCards(result);
      
    })
    .catch(err => console.log(err));
  }

  function isSaved(card) {
    const result = savedCards.some((savedCard) => savedCard.movieId === card.movieId);
    
    return result;
  }

  const signOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('initialMovies');
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('searchResults');
    localStorage.removeItem('checked');
    setInitialCards([]);
    setFilteredInitialCards([]);
    setSavedCards([]);
    setFilteredSavedCards([]);
    setErrorMessage('');
    setLoggedIn(false);
    setIsNoResults(false);
    setSuccessMessage('');
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
            onCardSave={handleCardSave}
            isSaved={isSaved}
            initialCards={initialCards}
            filteredInitialCards={filteredInitialCards}
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
            isMenuOpen={isMenuOpen}
            onClose={onClose}
            onCardDelete={handleCardDelete}
            isNoResults={isNoResults}
            savedCards={savedCards}
            filteredSavedCards={filteredSavedCards}
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
