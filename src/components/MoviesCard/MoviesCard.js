import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard ({ card, onCardSave, isSaved, onCardDelete }) {

  const location = useLocation();

  function handleSaveClick() {
    onCardSave(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  return (
    <div className="movies-card">
        <div className="movies-card__content">
          <div className="movies-card__content-block">
            <h2 className="movies-card__title">{card.nameRU}</h2>
            <p className="movies-card__description">{`${Math.trunc(card.duration / 60)}ч ${card.duration % 60}м`}</p>
          </div>
          {location.pathname === '/movies' && 
            <button 
              className={isSaved(card) ? 
              'movies-card__button movies-card__button_save movies-card__button_saved' 
              : 'movies-card__button movies-card__button_save'} 
              type="button"
              onClick={handleSaveClick}
            >
            </button>}

            {location.pathname === '/saved-movies' && 
              <button 
                className="movies-card__button movies-card__button_delete" 
                type="button"
                onClick={handleDeleteClick}
              >
              </button>}

        </div>
        <a className="movies-card__link" target='blank' href={card.trailerLink}>
          <img  className="movies-card__image" src={card.image} alt={card.description}/>
        </a>
    </div>
  );
}

export default MoviesCard;
