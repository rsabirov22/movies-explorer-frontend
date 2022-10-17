import React from 'react';
import FilterCheckBox from '../FilterCheckbox/FilterCheckbox.js';
import './SearchForm.css';

function SearchForm () {
    return(
        <section className='search-form'>
          <div className="page__container">
            <div className="search-form__wrapper">
              <div className="search-form__container">
                <form className='search-form__form'>
                    <input className='search-form__input' type='text' name='search' placeholder='Фильм' required></input>
                    <button className='search-form__button' type='submit'>Найти</button>
                </form>
              </div>
              <div className="search-form__toggle">
                <FilterCheckBox />
              </div>
            </div>
          </div>
        </section>
    )
}

export default SearchForm;
