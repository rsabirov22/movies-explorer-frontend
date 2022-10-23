import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Navigation from "../Navigation/Navigation";
import NoResults from "../NoResults/NoResults.js";

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

      {filteredSavedCards.length === 0 && savedCards.length > 0 && !isNoResults && 
      <MoviesCardList 
        cards={savedCards}
        onCardDelete={onCardDelete}
        isNoResults={isNoResults}
      />}

      {filteredSavedCards.length > 0 &&  
      <MoviesCardList 
        cards={filteredSavedCards}
        onCardDelete={onCardDelete}
        isNoResults={isNoResults}
      />}

      {isNoResults && <NoResults/>}

      <Navigation
        className="navigation navigation_mobile"
        isOpen={isMenuOpen}
        onClose={onClose}
      />

    </main>
  );
  
}

export default SavedMovies;
