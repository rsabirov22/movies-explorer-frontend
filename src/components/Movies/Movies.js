import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Navigation from "../Navigation/Navigation.js";
import NoResults from "../NoResults/NoResults.js";
import Preloader from '../Preloader/Preloader.js';
import './Movies.css';

function Movies ({ 
  initialCards, 
  filteredInitialCards, 
  isMenuOpen, 
  onClose,
  loggedIn,
  onCardSave, 
  isSaved, 
  onSearch, 
  isSearchResults, 
  onShorts }) {

  return (
    <main className='movies'>

      <SearchForm 
        onSearch={onSearch}
        onShorts={onShorts}
        loggedIn={loggedIn}
      />

      {initialCards.length > 0 && !JSON.parse(localStorage.getItem('searchResults')) &&
        <MoviesCardList
          cards={initialCards}
          onCardSave={onCardSave}
          isSaved={isSaved}
      />}

      {filteredInitialCards.length > 0 &&
        <MoviesCardList
          cards={filteredInitialCards}
          onCardSave={onCardSave}
          isSaved={isSaved}
      />}

      {filteredInitialCards.length === 0 && isSearchResults && <NoResults/>}

      {filteredInitialCards.length === 0 && initialCards.length === 0 && !isSearchResults && 
        <section className="movies__preloader">
          <Preloader />
        </section>}

      <Navigation
        className="navigation navigation_mobile"
        isOpen={isMenuOpen}
        onClose={onClose}
      />
      
    </main>
  );
}

export default Movies;
