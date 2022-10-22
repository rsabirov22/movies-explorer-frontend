import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Navigation from "../Navigation/Navigation";

function SavedMovies ({ 
  savedCards, 
  filteredSavedCards, 
  isMenuOpen, 
  onClose, 
  onCardDelete, 
  onSearch, 
  isNoResults, 
  onShorts }) {

  return (
    <main className='movies'>

      <SearchForm
        onSearch={onSearch}
        onShorts={onShorts}
      />

      {true && <MoviesCardList 
                  cards={savedCards}
                  onCardDelete={onCardDelete}
                  isNoResults={isNoResults}
      />}

      {false && <MoviesCardList 
                  cards={filteredSavedCards}
                  onCardDelete={onCardDelete}
                  isNoResults={isNoResults}
      />}

      <Navigation
        className="navigation navigation_mobile"
        isOpen={isMenuOpen}
        onClose={onClose}
      />

    </main>
  );
  
}

export default SavedMovies;
