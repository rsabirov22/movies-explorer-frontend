import React from 'react';
import { useHistory } from 'react-router-dom';
import './NotFound.css';

function NotFound () {

  const history = useHistory();

  function navigateBack () {

    history.go(-2);

  }

  return (
    <section className="not-found">
      <div className="page__container">
        <div className="not-found__container">
          <h1 className="not-found__title">404</h1>
          <p className="not-found__text">Страница не найдена</p>
          <button onClick={() => navigateBack()} className="not-found__link" type="button">Назад</button>
        </div>
      </div>
    </section>
  );
}

export default NotFound
