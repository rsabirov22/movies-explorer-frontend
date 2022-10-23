import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import './MoviesCardList.css';

function MoviesCardList ({ cards, onCardSave, isSaved, onCardDelete }) {

  const [cardsOnScreen, setCardsOnScreen] = React.useState([]);
  
  React.useEffect(() => {

    loadCards();
      
  }, [cards]);

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

        <div className="movies-cards__container">

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

        </div>

        {cards.length > cardsOnScreen.length &&
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
