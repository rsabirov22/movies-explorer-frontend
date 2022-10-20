import React from 'react';
import './FilterCheckbox.css';

function FilterCheckBox ({ onSearch }) {
  const [isShortsOnly, setIsShortsOnly]= React.useState(false);
  console.log(isShortsOnly);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch(isShortsOnly);
  }

  return(

    <div className='filter-checkBox'>
      <form className='filter-checkBox__form' onSubmit={handleSubmit} noValidate>
        <label htmlFor="shortMovies" className='filter-checkBox__label'>
          <input 
            type="checkbox" 
            name="short-checkbox" 
            id="shortMovies" 
            className="filter-checkBox__input"
            
            onClick = {() => setIsShortsOnly(!isShortsOnly)}
          />
          <span className="filter-checkBox__pseudo-item"></span>
          <span className="filter-checkBox__label-text">Короткометражки</span>
        </label>
      </form>
    </div>

  )
}

export default FilterCheckBox;
