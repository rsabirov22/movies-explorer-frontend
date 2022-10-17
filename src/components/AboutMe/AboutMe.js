import React from 'react';
import './AboutMe.css';
import foto from '../../images/avatar.jpg';

function AboutMe () {
    return (
        <section className="about-me" id="aboutMeId">
          <div className="page__container">
            <div className="about-me__container">
              <h3 className="content__block-title">Студент</h3>
              <div className="about-me__row">
                <div className="about-me__info">
                  <h2 className="about-me__title">Руслан</h2>
                  <p className="about-me__description">Фронтенд-разработчик, 37 лет</p>
                  <p className="about-me__text">Я родился и живу в Кыргызстане - г.Бишкек. 
                  Длительное время занимался исключительно версткой, и, осознав необходимость двигаться дальше в сторону фронтенд-разработки, выбрал Яндекс.Практикум. 
                  О чем не пожалел. Я хочу стать Frontend-разработчиком в продуктовой компании. 
                  Для меня важно ощущать причастность к созданию продукта, 
                  которым пользуется большое количество людей.</p>
                  <a className="about-me__link" href="https://github.com/rsabirov22" target="_blank" rel="noreferrer">Github</a>
                </div>
                <div className="about-me__img">
                  <img  className='about-me__pic' src={foto} alt="фото"/>
                </div>
              </div>
            </div>  
          </div>
        </section>     
    );
}

export default AboutMe;
