import React from 'react';
import './NoResults.css';

function NoResults ({ text }) {

  return (
    <section className="no-results">
      <div className="page__container">
        <p className="no-results__text">
          {text}
        </p>
      </div>
    </section>
  );
}

export default NoResults;
