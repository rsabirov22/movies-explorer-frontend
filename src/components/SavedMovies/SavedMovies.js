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

      {filteredSavedCards.length === 0 && isSavedCardsSearchResults && <NoResults text={'Ничего не найдено'} />}

      {savedCards.length === 0 && <NoResults text={'Добавьте свой первый фильм'} />}

      <Navigation
        className="navigation navigation_mobile"
        isOpen={isMenuOpen}
        onClose={onClose}
      />

    </main>
  );
  
}

export default SavedMovies;
