import React from 'react';
import './MoviesCard.css';

function MoviesCard (props) {


    return (
        <div className="movies-card">
            <img  className="movies-card__image" src={props.image} alt={props.description}/>
            <div className="movies-card__content">
                <h2 className="movies-card__title">{props.description}</h2>
                <button className= {props.className} type="submit"></button>
            </div>

            <p className="movies-card__description">{props.duration}</p>
           
        </div>
    );
}

export default MoviesCard;
