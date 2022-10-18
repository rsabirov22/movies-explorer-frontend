import { handleResponse } from "./utils.js";

const moviesApi = {
  getMovies () {
    return fetch ('https://api.nomoreparties.co/beatfilm-movies', {
      method:'GET',
      headers : {'Content-Type': 'application/json'}
    })
    .then(handleResponse);
  }
}

export default moviesApi;
