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
  isNoResults, 
  onShorts }) {

    // console.log(initialCards);
    // console.log(filteredInitialCards);

  return (
    <main className='movies'>

      <SearchForm 
        onSearch={onSearch}
        onShorts={onShorts}
        loggedIn={loggedIn}
      />

      {/* {filteredInitialCards.length === 0 && initialCards.length > 0 && !isNoResults && 
        <MoviesCardList
          cards={initialCards}
          onCardSave={onCardSave}
          isSaved={isSaved}
          isNoResults={isNoResults}
      />}

      {filteredInitialCards.length > 0 &&  
        <MoviesCardList
          cards={filteredInitialCards}
          onCardSave={onCardSave}
          isSaved={isSaved}
          isNoResults={isNoResults}
      />}

      {isNoResults && <NoResults/>} */}

      {initialCards.length > 0 && 
        <MoviesCardList
          cards={initialCards}
          onCardSave={onCardSave}
          isSaved={isSaved}
          isNoResults={isNoResults}
      />}

      {filteredInitialCards.length > 0 &&  
        <MoviesCardList
          cards={filteredInitialCards}
          onCardSave={onCardSave}
          isSaved={isSaved}
          isNoResults={isNoResults}
      />}

      {filteredInitialCards.length === 0 && <NoResults/>}

      {filteredInitialCards.length === 0 && initialCards.length === 0 && !isNoResults && 
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
