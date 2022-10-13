import React from 'react';
import './MoviesCard.css';

function MoviesCard (props) {


    return (
        <div className="movies-card">
            <div className="movies-card__content">
              <div className="movies-card__content-block">
                <h2 className="movies-card__title">{props.description}</h2>
                <p className="movies-card__description">{props.duration}</p>
              </div>
                <button className={props.isLiked ? 'movies-card__button movies-card__button_save movies-card__button_saved' : 'movies-card__button movies-card__button_save'} type="submit"></button>
            </div>
            <img  className="movies-card__image" src={props.image} alt={props.description}/>
        </div>
    );
}

export default MoviesCard;
