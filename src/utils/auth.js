import { BASE_URL } from './constants.js';
import { handleResponse } from "./utils.js";

export const register = (name, password, email) => {
  return fetch(`${BASE_URL}/api/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, password, email })
  })
  .then(handleResponse);
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/api/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ password, email })
  })
  .then(handleResponse);
};

export const getUserData = () => {
  return fetch(`${BASE_URL}/api/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  .then(handleResponse);
}

export const signout = () => {
  return fetch(`${BASE_URL}/api/signout`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    withCredentials: true,
  })
  .then(handleResponse);
}
