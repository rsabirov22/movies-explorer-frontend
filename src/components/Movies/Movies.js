import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Navigation from "../Navigation/Navigation.js";
import NoResults from "../NoResults/NoResults.js";
import './Movies.css';

function Movies ({ initialCards, 
  filteredInitialCards, 
  isMenuOpen, 
  onClose, 
  onCardSave, 
  isSaved, 
  isLoading, 
  onSearch, 
  isNoResults, 
  onShorts }) {

  return (
    <main className='movies'>

      <SearchForm 
        onSearch={onSearch}
        onShorts={onShorts}
      />

      {filteredInitialCards.length === 0 && initialCards.length > 0 && !isNoResults && 
      <MoviesCardList
        cards={initialCards}
        onCardSave={onCardSave}
        isSaved={isSaved}
        isLoading={isLoading}
        isNoResults={isNoResults}
      />}

      {filteredInitialCards.length > 0 && 
      <MoviesCardList
        cards={filteredInitialCards}
        onCardSave={onCardSave}
        isSaved={isSaved}
        isLoading={isLoading}
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

export default Movies;
