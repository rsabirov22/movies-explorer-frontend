import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';
import './Movies.css';

function Movies () {

    return (
        <main className='movies'>

          <SearchForm />

          <Preloader />

          <MoviesCardList className={"movies-card__button movies-card__button_save"}/>

          <div className="movies__more">
            <div className="page__container">
              <button className="movies__more-btn" type='button'>Ещё</button>
            </div>
          </div>
          
        </main>
    );
}

export default Movies;
