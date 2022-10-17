import React from 'react';
import {Link} from 'react-router-dom';
import SectionWithForm from '../SectionWithForm/SectionWithForm.js';

function Register () {
  return (
    <SectionWithForm>

      <form className="section-form__form" noValidate>

        <h1 className='section-form__title'>Добро пожаловать!</h1>

        <label className="section-form__field">
          Имя
          <input
            type="text"
            className="section-form__input"
            id="nameId"
            name="name"
            minLength="2"
            required
            autoComplete="off"
          />
          <span id="nameId-error" className="section-form__error"></span>
        </label>

        <label className="section-form__field">
          E-mail
          <input
            type="email"
            className="section-form__input"
            id="emailId"
            name="email"
            minLength="2"
            required
            autoComplete="off"
          />
          <span id="emailId-error" className="section-form__error"></span>
        </label>

        <label className="section-form__field">
          Пароль
          <input
            type="password"
            className="section-form__input"
            id="passwordId"
            name="password"
            minLength="2"
            required
            autoComplete="off"
          />
          <span id="passwordId-error" className="section-form__error">Что-то пошло не так...</span>
        </label>

        <button className='section-form__submit-btn' type='submit'>Зарегистрироваться</button>

      </form>      

      <p className="section-form__bottom">
        Уже зарегистрированы?
        <Link to='/signin' className="section-form__link">Войти</Link>
      </p>

    </SectionWithForm>
  );
}

export default Register;
