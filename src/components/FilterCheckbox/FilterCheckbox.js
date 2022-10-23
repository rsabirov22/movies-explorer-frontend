import React from 'react';
import { useLocation } from 'react-router-dom';
import './FilterCheckbox.css';

function FilterCheckBox ({ onShorts }) {
  const location = useLocation();
  const [isChecked, setIsChecked]= React.useState(false);

  // const [isChecked, setIsChecked] = React.useState(location.pathname === '/movies' ? JSON.parse(localStorage.getItem('checked')) : false);

  // console.log(isChecked);

  React.useEffect(() => {

    onShorts(isChecked);

    // if (location.pathname === '/movies') {
    //   localStorage.setItem('checked', JSON.stringify(isChecked));
    // }

  }, [isChecked])

  React.useEffect(() => {

    if (location.pathname === '/movies' && JSON.parse(localStorage.getItem('checked')) !== null) {
      setIsChecked(JSON.parse(localStorage.getItem('checked')));
    }

  }, [location])

  function handleCheck () {
    setIsChecked(!isChecked);

    // if (location.pathname === '/movies') {
    //   localStorage.setItem('checked', JSON.stringify(!isChecked));
    // }
  }

  return(

    <div className='filter-checkBox'>
      <form className='filter-checkBox__form' noValidate>
        <label htmlFor="shortMovies" className='filter-checkBox__label'>
          <input 
            type="checkbox" 
            name="short-checkbox"
            id="shortMovies" 
            className="filter-checkBox__input"
            value="only-shorts"
            checked={isChecked}
            onChange = {() => handleCheck()}
          />
          <span className="filter-checkBox__pseudo-item"></span>
          <span className="filter-checkBox__label-text">Короткометражки</span>
        </label>
      </form>
    </div>

  )
}

export default FilterCheckBox;
