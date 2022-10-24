import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Navigation from "../Navigation/Navigation";
import NoResults from "../NoResults/NoResults.js";
import Preloader from '../Preloader/Preloader.js';

function SavedMovies ({ 
  savedCards, 
  filteredSavedCards, 
  isMenuOpen, 
  onClose, 
  onCardDelete, 
  onSearch, 
  isSavedCardsSearchResults, 
  onShorts }) {

  return (
    <main className='movies'>

      <SearchForm
        onSearch={onSearch}
        onShorts={onShorts}
      />

      {savedCards.length > 0 && !isSavedCardsSearchResults &&
        <MoviesCardList 
          cards={savedCards}
          onCardDelete={onCardDelete}
      />}

      {filteredSavedCards.length > 0 &&  
        <MoviesCardList 
          cards={filteredSavedCards}
          onCardDelete={onCardDelete}
      />}

      {filteredSavedCards.length === 0 && isSavedCardsSearchResults && <NoResults/>}

      {filteredSavedCards.length === 0 && savedCards.length === 0 && !isSavedCardsSearchResults && 
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

export default SavedMovies;
