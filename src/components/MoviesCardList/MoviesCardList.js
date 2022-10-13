import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import poster from '../../images/movie-1.png';
import posterTwo from '../../images/movie-2.png';
import './MoviesCardList.css';

const movies = [
    {
      description: '33 слова о дизайне',
      image: poster,
      duration: '1ч42м',
      id: '1',
      isLiked: true,
    },
    {
      description: 'Киноальманах «100 лет дизайна»',
      image: posterTwo,
      duration: '1ч42м',
      id: '2',
      isLiked: false,
    },
    {
      description: 'Баския: Взрыв реальности',
      image: posterTwo,
      duration: '1ч42м',
      id: '3',
      isLiked: false,
    },
    {
      description: 'Книготорговцы',
      image: poster,
      duration: '1ч42м',
      id: '4',
      isLiked: true,
    },
    {
      description: 'Когда я думаю о Германии ночью',
      image: poster,
      duration: '1ч42м',
      id: '5',
      isLiked: true,
    },
    {
      description: 'Gimme Danger: История Игги и The Stooges',
      image: posterTwo,
      duration: '1ч42м',
      id: '6',
      isLiked: false,
    },
    {
      description: 'Дженис: Маленькая девочка грустит',
      image: posterTwo,
      duration: '1ч42м',
      id: '7',
      isLiked: true,
    },
    {
      description: 'Соберись перед прыжком',
      image: poster,
      duration: '1ч42м',
      id: '8',
      isLiked: false,
    },
    {
      description: 'Пи Джей Харви: A dog called money',
      image: posterTwo,
      duration: '1ч42м',
      id: '9',
      isLiked: true,
    },
    {
      description: 'По волнам: Искусство звука в кино',
      image: poster,
      duration: '1ч42м',
      id: '10',
      isLiked: true,
    },
    {
      description: 'Рудбой',
      image: poster,
      duration: '1ч42м',
      id: '11',
      isLiked: true,
    },
    {
      description: 'Скейт — кухня',
      image: poster,
      duration: '1ч42м',
      id: '12',
      isLiked: true,
    },
  ];

function MoviesCardList (props) {

    return (
        <section className="movies-cards">
          <div className="page__container">

            {movies.length > 0 && 
              <div className="movies-cards__container">

                {movies.map((movie) => (
                    <MoviesCard 
                      image = {movie.image}
                      key={movie.id}
                      description = {movie.description}
                      duration = {movie.duration}
                      isLiked={movie.isLiked}
                      className = {props.className}>
                    </MoviesCard>
                    
                ))}

              </div>}

              {!movies.length &&
                <p className="movies-cards__empty">
                  Добавьте свой первый фильм
                </p>}

          </div>
        </section>
    );
}

export default MoviesCardList;
