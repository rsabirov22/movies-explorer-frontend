import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard (props) {
  // console.log(props.movie)
  const location = useLocation();

  function handleSaveClick() {
    // console.log(props.movie)
    props.onCardSave(props.movie);
  }

  return (
    <div className="movies-card">
        <div className="movies-card__content">
          <div className="movies-card__content-block">
            <h2 className="movies-card__title">{props.title}</h2>
            <p className="movies-card__description">{`${Math.trunc(props.duration / 60)}ч ${props.duration % 60}м`}</p>
          </div>
          {location.pathname === '/movies' && 
            <button 
              className={props.isLiked ? 
              'movies-card__button movies-card__button_save movies-card__button_saved' 
              : 'movies-card__button movies-card__button_save'} 
              type="button"
              onClick={handleSaveClick}
            ></button>}

            {location.pathname === '/saved-movies' && <button className="movies-card__button movies-card__button_delete" type="button"></button>}

        </div>
        <img  className="movies-card__image" src={props.image} alt={props.description}/>
    </div>
  );
}

export default MoviesCard;
