import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';

function SavedMovies () {

    return (
        <main className='movies'>

          <SearchForm />

          <MoviesCardList className={"movies-card__button movies-card__button_delete"}/>

        </main>
    );
}

export default SavedMovies;
