import React from 'react';
import './NoResults.css';

function NoResults () {

  return (
    <section className="no-results">
      <div className="page__container">
        <p className="no-results__text">
          Ничего не найдено
        </p>
      </div>
    </section>
  );
}

export default NoResults;
