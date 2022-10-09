import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import './Movies.css';

function Movies () {

    return (
        <main className='movies'>

          <SearchForm />

          <MoviesCardList className={"movies-card__button movies-card__button_saved"}/>

        </main>
    );
}

export default Movies;
