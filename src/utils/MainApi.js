import { handleResponse } from "./utils.js";
import { BASE_URL } from "./constants.js";

class MainApi {
  constructor(options) {
    this._headers = options.headers;
  }

  getSavedMovies() {
    return fetch(`${BASE_URL}/movies`, {
      headers: this._headers,
      credentials: 'include',
    })
    .then(handleResponse);
  }

  postMovie(data) {
    return fetch(`${BASE_URL}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(this.handleResponse);
  }

  deleteMovie(moviedId) {
    return fetch(`${BASE_URL}/movies/${moviedId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this.handleResponse);
  }

  patchProfile(data) {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(this.handleResponse);
  }
}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
});

export default mainApi;
