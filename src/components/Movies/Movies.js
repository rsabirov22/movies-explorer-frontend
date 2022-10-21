import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Navigation from "../Navigation/Navigation";
import './Movies.css';

function Movies ({ isMenuOpen, onClose, cards, onCardSave, isSaved, isLoading, onSearch, isNoResults, onShorts }) {

  return (
    <main className='movies'>

      <SearchForm 
        onSearch={onSearch}
        onShorts={onShorts}
      />

      <MoviesCardList
        cards={cards}
        onCardSave={onCardSave}
        isSaved={isSaved}
        isLoading={isLoading}
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

export default Movies;
