import React from 'react';
import './Techs.css';

function Techs () {
    return (
        <section className="techs" id="techsId">
          <div className="page__container">
            <h3 className="content__block-title">Технологии</h3>
            <h2 className="techs__title">7 технологий</h2>
            <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <div className="techs__skills">
              <p className="techs__skill">HTML</p>
              <p className="techs__skill">CSS</p>
              <p className="techs__skill">JS</p>
              <p className="techs__skill">React</p>
              <p className="techs__skill">Git</p>
              <p className="techs__skill">Express.js</p>
              <p className="techs__skill">mongoDB</p>
            </div>
          </div>
        </section>     
    );
}

export default Techs;
