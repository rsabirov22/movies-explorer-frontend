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
  isSearchResults, 
  onShorts }) {

  return (
    <main className='movies'>

      <SearchForm
        onSearch={onSearch}
        onShorts={onShorts}
      />

      {filteredSavedCards.length === 0 && savedCards.length > 0 && !isSearchResults && 
        <MoviesCardList 
          cards={savedCards}
          onCardDelete={onCardDelete}
          isSearchResults={isSearchResults}
      />}

      {filteredSavedCards.length > 0 &&  
        <MoviesCardList 
          cards={filteredSavedCards}
          onCardDelete={onCardDelete}
          isSearchResults={isSearchResults}
      />}

      {isSearchResults && <NoResults/>}

      {filteredSavedCards.length === 0 && savedCards.length === 0 && !isSearchResults && 
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
