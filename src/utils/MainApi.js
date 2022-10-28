import { handleResponse } from "./utils.js";
import { BASE_URL } from "./constants.js";

class MainApi {
  constructor(options) {
    this._headers = options.headers;
  }

  getSavedMovies() {
    return fetch(`${BASE_URL}/api/movies`, {
      method:'GET',
      headers: this._headers,
      credentials: 'include',
    })
    .then(handleResponse);
  }

  postMovie(data) {
    return fetch(`${BASE_URL}/api/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(handleResponse);
  }

  deleteMovie(moviedId) {
    return fetch(`${BASE_URL}/api/movies/${moviedId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
    .then(handleResponse);
  }

  patchProfile(data) {
    return fetch(`${BASE_URL}/api/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(handleResponse);
  }
}

const mainApi = new MainApi({
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
});

export default mainApi;
