import React from 'react';
import './AboutProject.css';

function AboutProject () {
    return (
        <section className="about-project" id="aboutProjectId">
          <div className="page__container">
            <h3 className="content__block-title">O проекте</h3>
            <div className="about-project__row">
                <div className="about-project__col">
                    <h4 className="about-project__title">Дипломный проект включал 5 этапов</h4>
                    <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__col">
                    <h4 className="about-project__title">На выполнение диплома ушло 5 недель</h4>
                    <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__progress">
                <div className="about-project__progress-col">
                    <p className="about-project__progress-text">1 неделя</p>
                </div>
                <div className="about-project__progress-col">
                    <p className="about-project__progress-text">4 недели</p>
                </div>
                <div className="about-project__progress-col">
                    <p className="about-project__progress-text about-project__progress-text_bottom">Back-end</p>
                </div>
                <div className="about-project__progress-col">
                    <p className="about-project__progress-text about-project__progress-text_bottom">Front-end</p>
                </div>
            </div>
          </div>
        </section>     
    );
}

export default AboutProject;
