import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Navigation from "../Navigation/Navigation";
import './Movies.css';

function Movies ({ isMenuOpen, onClose, cards, onCardSave, isSaved, isLoading }) {

  return (
    <main className='movies'>

      <SearchForm />

      <MoviesCardList
        cards={cards}
        onCardSave={onCardSave}
        isSaved={isSaved}
        isLoading={isLoading}
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
