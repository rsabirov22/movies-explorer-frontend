import React, { useState, useEffect } from 'react';
import FilterCheckBox from '../FilterCheckbox/FilterCheckbox.js';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

function SearchForm ({ onSearch, onShorts }) {
  
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {

    if (location.pathname === '/movies' && localStorage.getItem('searchQuery')) {
      setSearchQuery(localStorage.getItem('searchQuery'));
    }

  }, [location])

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch(searchQuery);
  }

  return(
    <section className="search-form">
      <div className="page__container">
        <div className="search-form__wrapper">
          <div className="search-form__container">
            <form className='search-form__form' onSubmit={handleSubmit} noValidate>
                <input 
                  className='search-form__input' 
                  type='text' 
                  name='search' 
                  placeholder='Фильм'
                  value={searchQuery}
                  onChange={({ target }) => setSearchQuery(target.value)}
                >
                </input>
                <button className='search-form__button' type='submit'></button>
            </form>
          </div>
          <div className="search-form__toggle">
            <FilterCheckBox 
              onShorts={onShorts}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchForm;
