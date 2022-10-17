import React from 'react';
import './Portfolio.css';

function Portfolio () {
    return (
        <section className="portfolio">
          <div className="page__container">
            <div className="portfolio__container">
              <h3 className="portfolio__block-title">Портфолио</h3>
              <ul className="portfolio__links">
                <li className="portfolio__links-item">
                  <a href="https://rsabirov22.github.io/how-to-learn/index.html" className="portfolio__link" target="blank">Статичный сайт</a>
                </li>
                <li className="portfolio__links-item">
                  <a href="https://rsabirov22.github.io/russian-travel/index.html" className="portfolio__link" target="blank">Адаптивный сайт</a>
                </li>
                <li className="portfolio__links-item">
                  <a href="https://mesto.rsabirov.nomoredomains.sbs/" className="portfolio__link" target="blank">Одностраничное приложение</a>
                </li>
              </ul>
            </div>
          </div>
        </section>     
    );
}

export default Portfolio;
