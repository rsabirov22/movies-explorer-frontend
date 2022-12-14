import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Navigation from "../Navigation/Navigation";
import MessageBlock from '../MessageBlock/MessageBlock.js';
import './Profile.css';

function Profile ({ isMenuOpen, onClose, onEditProfile, errorMessage, signOut, successMessage }) {

  const { register, getValues, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
  const currentUser = useContext(CurrentUserContext);
  const [hasChanged, setHasChanged] = useState(false);

  const checkForChanges = () => {
    const values = getValues();
    
    if (values.name !== currentUser.name || values.email !== currentUser.email) {
      setHasChanged(true);
    } else {
      setHasChanged(false);
    }
  }

  const onSubmit = (data) => {
    onEditProfile(data);
    setHasChanged(false);
  }

  return (
    <main className='profile'>
      <div className="page__container">
        <div className="profile__container">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <form className="profile__form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <label className="profile__field">
              Имя
              <input
                type="text"
                className="profile__input popup__input_type_name"
                id="nickname"
                name="name"
                {...register("name", {
                  onChange: checkForChanges,
                  required: true,
                  value: currentUser.name,
                  minLength: 2,
                  maxLength: 30,
                  pattern: /^[a-zа-яё -]/i
                 })}
              />
              <p id="nickname-error" className="profile__field-error">
                {errors.name && errors.name.type === 'minLength' && 'Слишком короткое имя'}
                {errors.name && errors.name.type === 'required' && 'Поле не может быть пустым'}
                {errors.name && errors.name.type === 'maxLength' && 'Слишком длинное имя'}
                {errors.name && errors.name.type === 'pattern' && 'Использованы недопустимые символы'}
              </p>
            </label>
            <hr className="profile__field-divider"></hr>
            <label className="profile__field">
              E-mail
              <input
                type="email"
                className="profile__input popup__input_type_email"
                id="mail"
                name="email"
                {...register("email", {
                  onChange: checkForChanges,
                  required: true,
                  value: currentUser.email,
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                 })}
              />
              <p id="nickname-error" className="profile__field-error">
                {errors.email && errors.email.type === 'required' && 'Поле не может быть пустым'}
                {errors.email && errors.email.type === 'pattern' && 'Неверный формат почты'}
              </p>
            </label>

            <div className="profile__message">
            
            </div>

            <MessageBlock 
              errorMessage={errorMessage}
              successMessage={successMessage}
            />

            <button 
              className={hasChanged && isValid ? 'profile__submit-btn' : 'profile__submit-btn profile__submit-btn_disabled'}
              type='submit'
              disabled={!isValid && !hasChanged}
            >
              Редактировать
            </button>

          </form>

          <button 
            className='profile__logout-btn' 
            type='submit'
            onClick={() => signOut()}
          >Выйти из аккаунта</button>

        </div>
      </div>

      <Navigation
        className="navigation navigation_mobile"
        isOpen={isMenuOpen}
        onClose={onClose}
      />

    </main>
  );
}

export default Profile;
