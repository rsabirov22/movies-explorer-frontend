import React, { useState } from "react";
import { Route, Switch, Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { SHORT_MOVIES } from '../../utils/constants.js'

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
  const [isShortsOnly, setIsShortsOnly] = React.useState(false);
  const [isSearchResults, setIsSearchResults] = React.useState(false);
  const [isSavedCardsSearchResults, setIsSavedCardsSearchResults] = React.useState(false);
  // Карточки
  const [initialCards, setInitialCards] = React.useState([]);
  const [filteredInitialCards, setFilteredInitialCards] = React.useState([]);
  const [savedCards, setSavedCards] = React.useState([]);
  const [filteredSavedCards, setFilteredSavedCards] = React.useState([]);

  React.useEffect (() => {
    
    if (localStorage.getItem('loggedIn')) {

    const loggedIn = localStorage.getItem('loggedIn');

    if (loggedIn) {

        auth.getUserData()
        .then((res) => {

          if (res) {
            
            setLoggedIn(true);
            setCurrentUser({
              id: res._id,
              email: res.email,
              name: res.name
            });
            history.push(location.pathname);

          }

        })
        .catch((err) => {      
          localStorage.removeItem('loggedIn');
          localStorage.removeItem('initialMovies');
          localStorage.removeItem('searchQuery');
          localStorage.removeItem('searchResults');
          localStorage.removeItem('checked');
          localStorage.removeItem('isSearchResults');
          setInitialCards([]);
          setFilteredInitialCards([]);
          setSavedCards([]);
          setFilteredSavedCards([]);
          setCurrentUser({});
          setErrorMessage('');
          setLoggedIn(false);
          setIsSearchResults(false);
          setIsSavedCardsSearchResults(false);
          setSuccessMessage('');
          history.push('/');
          console.log(err)
        });

      }

    }

  }, [loggedIn]);
  
  React.useEffect(() => {
    // Загрузка карточек
    if (loggedIn) {

      moviesApi.getMovies()
      .then((data) => {

        // сохраняем данные с сервера в локальное хранилище
        localStorage.setItem('initialMovies', JSON.stringify(data));

        if (!JSON.parse(localStorage.getItem('searchResults'))) {
          
          makeCards(JSON.parse(localStorage.getItem('initialMovies')));
        
        }
        
      })
      .catch(err => console.log(err));

      getSavedCards();

    }
    // Загрузка карточек
  }, [loggedIn]);

  React.useEffect(() => {

    const storageCards = JSON.parse(localStorage.getItem('searchResults'));
    const isSearchResults = JSON.parse(localStorage.getItem('isSearchResults'));

    if (loggedIn && storageCards) {

      setIsSearchResults(isSearchResults);
      setFilteredInitialCards(storageCards);
      makeCards(JSON.parse(localStorage.getItem('initialMovies')));

    }
    
  }, [location]);

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
          setLoggedIn(true);
          localStorage.setItem('loggedIn', true);
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

        setIsSearchResults(false);
        setFilteredInitialCards([]);
        localStorage.removeItem('searchResults');
        makeCards(JSON.parse(localStorage.getItem('initialMovies')));

      } else if (query && !isShortsOnly) {

        result = initialCards.filter(card => card.nameRU.toLowerCase().includes(query.toLowerCase()));
        
        if (result.length === 0) {
          setIsSearchResults(true);
          setFilteredInitialCards([]);
          localStorage.setItem('searchResults', JSON.stringify(result));
          localStorage.setItem('isSearchResults', true);
        } else {
          setIsSearchResults(true);
          localStorage.setItem('searchResults', JSON.stringify(result));
          localStorage.setItem('isSearchResults', true);
          setFilteredInitialCards(result);
        }
      } else if (isShortsOnly && (query === '' || !query)) {

        result = initialCards.filter(card => card.duration <= SHORT_MOVIES);
     
        if (result.length === 0) {
          setIsSearchResults(true);
          setFilteredInitialCards([]);
          localStorage.setItem('searchResults', JSON.stringify(result));
          localStorage.setItem('isSearchResults', true);
        } else {
          setIsSearchResults(true);
          localStorage.setItem('searchResults', JSON.stringify(result));
          localStorage.setItem('isSearchResults', true);
          setFilteredInitialCards(result);
        }

      } else if (isShortsOnly && query) {

        result = initialCards.filter(card => (card.duration <= SHORT_MOVIES) && (card.nameRU.toLowerCase().includes(query.toLowerCase())));
       
        if (result.length === 0) {
          setIsSearchResults(true);
          setFilteredInitialCards([]);
          localStorage.setItem('searchResults', JSON.stringify(result));
          localStorage.setItem('isSearchResults', true);
        } else {
          setIsSearchResults(true);
          localStorage.setItem('searchResults', JSON.stringify(result));
          localStorage.setItem('isSearchResults', true);
          setFilteredInitialCards(result);
        }

      }

    } else if (location.pathname === '/saved-movies') {

      if ((query === '' || !query) && !isShortsOnly) {

        setIsSavedCardsSearchResults(false);
        setFilteredSavedCards([]);
        getSavedCards();

      } else if (query && !isShortsOnly) {
        
        result = savedCards.filter(card => card.nameRU.toLowerCase().includes(query.toLowerCase()));
        
        if (result.length === 0) {
          setIsSavedCardsSearchResults(true);
          setFilteredSavedCards([]);
        } else {
          setIsSavedCardsSearchResults(true);
          setFilteredSavedCards(result);
        }
      } else if (isShortsOnly && (query === '' || !query)) {

        result = savedCards.filter(card => card.duration <= SHORT_MOVIES);
        
        if (result.length === 0) {
          setIsSavedCardsSearchResults(true);
          setFilteredSavedCards([]);
        } else {
          setIsSavedCardsSearchResults(true);
          setFilteredSavedCards(result);
        }

      } else if (isShortsOnly && query) {

        result = savedCards.filter(card => (card.duration <= SHORT_MOVIES) && (card.nameRU.toLowerCase().includes(query.toLowerCase())));
        
        if (result.length === 0) {
          setIsSavedCardsSearchResults(true);
          setFilteredSavedCards([]);
        } else {
          setIsSavedCardsSearchResults(true);
          setFilteredSavedCards(result);
        }

      }

    }

  }

  function handleCardSave(card) {

    const isCardSaved = isSaved(card);

    if (!isCardSaved) {

      mainApi.postMovie(card)
      .then((data) => {
          setSavedCards([data, ...savedCards]);
      })
      .catch(err => console.log(err));

    } 
    else {
      // находим текущую сохраненную карточку в начальных карточках по id из BeatfilmMovies
      const savedCard = savedCards.filter(savedCard => savedCard.movieId === card.movieId);
      // берем из нее _id нашей базы и удаляем
      handleCardDelete(savedCard[0]._id);
    }

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
    auth.signout()
    .then((res) => {})
    .catch(err => console.log(err));

    localStorage.removeItem('loggedIn');
    localStorage.removeItem('initialMovies');
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('searchResults');
    localStorage.removeItem('checked');
    localStorage.removeItem('isSearchResults');
    setInitialCards([]);
    setFilteredInitialCards([]);
    setSavedCards([]);
    setFilteredSavedCards([]);
    setCurrentUser({});
    setErrorMessage('');
    setLoggedIn(false);
    setIsSearchResults(false);
    setIsSavedCardsSearchResults(false);
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

            <Main
              isMenuOpen={isMenuOpen}
              onClose={onClose}
            />

          </Route>

          <Route path='/signup'>

            {loggedIn ?
              <Redirect to= '/movies'/> :
              <Register 
                onRegister={onRegister}
                errorMessage={errorMessage}
              />}
            
          </Route>

          <Route path='/signin'>

            {loggedIn ? 
              <Redirect to= '/movies'/> :
              <Login
                onLogin={onLogin}
                errorMessage={errorMessage}
              />}

          </Route>

          <ProtectedRoute
            path='/movies'
            loggedIn={loggedIn}
            component={Movies}
            isMenuOpen={isMenuOpen}
            isSearchResults={isSearchResults}
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
            isSavedCardsSearchResults={isSavedCardsSearchResults}
            savedCards={savedCards}
            filteredSavedCards={filteredSavedCards}
          >
          </ProtectedRoute>

          <Route path='*'>

            <NotFound />

          </Route>

        </Switch>

        <Footer />

      </CurrentUserContext.Provider>
    
    </div>
  );
}

export default App;
