import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Navigation from "../Navigation/Navigation";

function SavedMovies ({ isMenuOpen, onClose }) {

    return (
        <main className='movies'>

          <SearchForm />

          <MoviesCardList className={"movies-card__button movies-card__button_delete"}/>

          <Navigation
            className="navigation navigation_mobile"
            isOpen={isMenuOpen}
            onClose={onClose}
          />

        </main>
    );
}

export default SavedMovies;
