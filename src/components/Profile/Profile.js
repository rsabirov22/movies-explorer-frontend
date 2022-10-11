import React from 'react';
import { useState, useEffect } from 'react';
import './Profile.css';

function Profile () {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  useEffect(() => {
    setName('Руслан');
    setEmail('rsabirov22@yandex.com');
  }, []);

    return (
        <main className='profile'>
          <div className="page__container">
            <div className="profile__container">
              <h1 className="profile__title">Привет, {name}!</h1>
              <form className="profile__form" noValidate>
                <label className="profile__field">
                  Имя
                  <input
                    type="text"
                    className="profile__input popup__input_type_name"
                    id="nickname"
                    name="name"
                    value={name}
                    onChange={handleChangeName}
                    minLength="2"
                    maxLength="40"
                    required
                    autoComplete="off"
                  />
                  <span id="nickname-error" className="profile__error profile__error_visible">Пользователь с таким именем уже существует.</span>
                </label>
                <hr className="profile__filed-divider"></hr>
                <label className="profile__field">
                  E-mail
                  <input
                    type="email"
                    className="profile__input popup__input_type_email"
                    id="mail"
                    name="email"
                    value={email}
                    onChange={handleChangeEmail}
                    minLength="2"
                    maxLength="40"
                    required
                    autoComplete="off"
                  />
                  <span id="nickname-error" className="profile__error">Пользователь с таким email уже существует.</span>
                </label>

                <button className='profile__submit-btn' type='submit'>Редактировать</button>

              </form>

              <button className='profile__logout-btn' type='submit'>Выйти из аккаунта</button>

            </div>
          </div>
        </main>
    );
}

export default Profile;
