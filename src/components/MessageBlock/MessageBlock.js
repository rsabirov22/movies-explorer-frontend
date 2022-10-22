import React from 'react';
import { useLocation } from 'react-router-dom';
import './MessageBlock.css';

function MessageBlock ({ errorMessage, successMessage }) {

  const location = useLocation();
  
  return(

    <div className='message'>
      <p className={errorMessage !== '' && errorMessage !== 'Ошибка: 409' && location.pathname === '/profile' ? 'message__error message__error_visible' : 'message__error'}>
        При обновлении профиля произошла ошибка.
      </p>
      <p className={errorMessage !== '' && errorMessage === 'Ошибка: 409' && location.pathname === '/profile' ? 'message__error message__error_visible' : 'message__error'}>
        Пользователь с таким email уже существует.
      </p>
      <p className={errorMessage !== '' && errorMessage !== 'Ошибка: 409' && location.pathname === '/signup' ? 'message__error message__error_visible' : 'message__error'}>
        При регистрации пользователя произошла ошибка.
      </p>
      <p className={errorMessage !== '' && errorMessage === 'Ошибка: 409' && location.pathname === '/signup' ? 'message__error message__error_visible' : 'message__error'}>
        Пользователь с таким email уже существует.
      </p>
      <p className={errorMessage !== '' && errorMessage !== 'Ошибка: 401' && location.pathname === '/signin' ? 'message__error message__error_visible' : 'message__error'}>
        При авторизации произошла ошибка.
      </p>
      <p className={errorMessage !== '' && errorMessage === 'Ошибка: 401' && location.pathname === '/signin' ? 'message__error message__error_visible' : 'message__error'}>
        Вы ввели неправильный логин или пароль.
      </p>
      <p className={successMessage !== '' && successMessage ? 'message__success message__success_visible' : 'message__success'}>
        {successMessage}
      </p>
    </div>

  )
}

export default MessageBlock;
