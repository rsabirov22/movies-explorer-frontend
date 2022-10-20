import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Navigation from "../Navigation/Navigation";

function SavedMovies ({ isMenuOpen, onClose, savedMovies, onCardDelete, onSearch, isNoResults }) {
  return (
    <main className='movies'>

      <SearchForm
        onSearch={onSearch}
      />

      <MoviesCardList 
        cards={savedMovies}
        onCardDelete={onCardDelete}
        isNoResults={isNoResults}
      />

      <Navigation
        className="navigation navigation_mobile"
        isOpen={isMenuOpen}
        onClose={onClose}
      />

    </main>
  );
}

export default SavedMovies;
