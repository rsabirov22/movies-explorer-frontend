import React from 'react';
import './FilterCheckbox.css';

function FilterCheckBox () {
    return(
        <div className='filter-checkBox'>
          <form className='filter-checkBox__form'>
            <label htmlFor="shortMovies" className='filter-checkBox__label'>
              <input 
                type="checkbox" 
                name="short-checkbox" 
                id="shortMovies" 
                className='filter-checkBox__input'
                value="only-shorts"
              />
              <span className="filter-checkBox__pseudo-item"></span>
              <span className="filter-checkBox__label-text">Короткометражки</span>
            </label>
          </form>
        </div>
    )
}

export default FilterCheckBox;
