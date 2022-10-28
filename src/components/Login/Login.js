import React from 'react';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import SectionWithForm from '../SectionWithForm/SectionWithForm.js';
import MessageBlock from '../MessageBlock/MessageBlock.js';

function Login ({ onLogin, errorMessage }) {

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    onLogin(data);
  }

  return (
    <SectionWithForm>

      <form className="section-form__form" onSubmit={handleSubmit(onSubmit)} noValidate>

        <h1 className='section-form__title'>Рады видеть!</h1>

        <label className="section-form__field">
          E-mail
          <input
            type="email"
            className="section-form__input"
            id="emailId"
            name="email"
            minLength="2"
            required
            {...register("email", { 
              required: true,
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
             })}
          />
          <span id="emailId-error" className="section-form__field-error">
            {errors.email && errors.email.type === 'required' && 'Поле не может быть пустым'}
            {errors.email && errors.email.type === 'pattern' && 'Неверный формат почты'}
          </span>
        </label>

        <label className="section-form__field">
          Пароль
          <input
            type="password"
            className="section-form__input"
            id="passwordId"
            name="password"
            required
            {...register("password", { 
              required: true,
             })}
          />
          <span id="passwordId-error" className="section-form__field-error">
            {errors.password && errors.password.type === 'required' && "Поле не может быть пустым"}
          </span>
        </label>

        <MessageBlock errorMessage={errorMessage}/>

        <button 
          className={isValid ? 'section-form__submit-btn' : 'section-form__submit-btn section-form__submit-btn_disabled'}
          type='submit'
          disabled={!isValid}
        >
            Войти
        </button>

      </form>      

      <p className="section-form__bottom">
        Ещё не зарегистрированы?
        <Link to='/signup' className="section-form__link">Регистрация</Link>
      </p>

    </SectionWithForm>
  );
}

export default Login;
