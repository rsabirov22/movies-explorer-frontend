import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';
import Navigation from "../Navigation/Navigation";
import './Movies.css';

function Movies ({ isMenuOpen, onClose, cards, onCardSave }) {

    return (
        <main className='movies'>

          <SearchForm />

          <Preloader />

          <MoviesCardList
            cards={cards}
            onCardSave={onCardSave}
          />

          <div className="movies__more">
            <div className="page__container">
              <button className="movies__more-btn" type='button'>Ещё</button>
            </div>
          </div>

          <Navigation
            className="navigation navigation_mobile"
            isOpen={isMenuOpen}
            onClose={onClose}
          />
          
        </main>
    );
}

export default Movies;
