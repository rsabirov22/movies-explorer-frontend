import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import './MoviesCardList.css';

function MoviesCardList (props) {

    return (
        <section className="movies-cards">
          <div className="page__container">

            {props.cards.length > 0 && 
              <div className="movies-cards__container">

                {props.cards.map((movie) => (

                  <MoviesCard 
                    card={movie}
                    onCardSave={props.onCardSave}
                    key={movie.movieId}
                    isSaved={props.isSaved}
                    onCardDelete={props.onCardDelete}
                  >
                  </MoviesCard>

                ))}

              </div>}

              {!props.cards.length &&
                <p className="movies-cards__empty">
                  Добавьте свой первый фильм
                </p>}

          </div>
        </section>
    );
}

export default MoviesCardList;
