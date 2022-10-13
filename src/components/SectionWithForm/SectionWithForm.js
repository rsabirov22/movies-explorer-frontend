import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/header-logo.svg';
import './SectionWithForm.css';

function SectionWithForm({ children }) {

  return (
    <section className="section-form">
      <div className="page__container">
        <div className="section-form__container">
          <Link to='/' className='section-form__home'>
            <img  className="section-form__logo" src={logo} alt="лого"/>
          </Link>

          { children }
          
        </div>
      </div>
    </section>
  );
}

export default SectionWithForm;
