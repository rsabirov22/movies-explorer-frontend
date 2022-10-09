import React from 'react';
import './FilterCheckbox.css';

function FilterCheckBox () {
    return(
        <div className='filter-checkBox'>
          <form className='filter-checkBox__form'>
            <label htmlFor="short-movies" className='filter-checkBox__label'>
              <span className="filter-checkBox__label-text">Короткометражки</span>
              <input 
                type="checkbox" 
                name="short-checkbox" 
                id="short-movies" 
                className='filter-checkBox__input'
                value="only-shorts"
              />
              <span className="filter-checkBox__pseudo-item"></span>
            </label>
          </form>
        </div>
    )
}

export default FilterCheckBox;
