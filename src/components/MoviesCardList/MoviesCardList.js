import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import Preloader from '../Preloader/Preloader.js';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';

function MoviesCardList ({ cards, onCardSave, isSaved, onCardDelete, isLoading }) {

  const [cardsOnScreen, setCardsOnScreen] = React.useState(cards);
  const location = useLocation();

  React.useEffect(() => {

    loadCards();
      
  }, []);

  function loadCards() {

    if (window.innerWidth > 1001) {
      setCardsOnScreen(cards.slice(0, 12))
    } else if (window.innerWidth > 480 && window.innerWidth <= 1000) {
      setCardsOnScreen(cards.slice(0, 8))
    } else if (window.innerWidth < 480) {
      setCardsOnScreen(cards.slice(0, 5));
    }

  }

    window.resize = function () {
      setTimeout(() => {
        loadCards();
      }, 700)
    }

    function handleLoadMoreClick() {

      if (window.innerWidth > 1001) {
        setCardsOnScreen(cards.slice(0, cardsOnScreen.length + 3));
      } else if (window.innerWidth <= 1000) {
        setCardsOnScreen(cards.slice(0, cardsOnScreen.length + 2));
      } 

    }

    return (
        <section className="movies-cards">
          <div className="page__container">

              {isLoading && 
              <div className="movies-cards__preloader">
                <Preloader />
              </div>}

              {!isLoading && <div className="movies-cards__container">

                {cardsOnScreen.map((movie) => (

                  <MoviesCard 
                    card={movie}
                    onCardSave={onCardSave}
                    key={movie.movieId}
                    isSaved={isSaved}
                    onCardDelete={onCardDelete}
                  >
                  </MoviesCard>

                ))}

              </div>}

              {!cards.length && location.pathname === '/saved-movies' &&
                <p className="movies-cards__empty">
                  Добавьте свой первый фильм
                </p>}

            {location.pathname === '/movies' && 
            cards.length > cardsOnScreen.length &&
            !isLoading &&
              <div className="movies__more">
                <button 
                  className="movies__more-btn" 
                  type='button'
                  onClick={handleLoadMoreClick}
                >
                  Ещё
                </button>
              </div>}

          </div>
        </section>
    );
}

export default MoviesCardList;
