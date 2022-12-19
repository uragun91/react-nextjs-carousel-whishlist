export const baseUrl = 'https://api.themoviedb.org/3/movie/';
export const apiKey = '570ae64e7e066406fbf495e24e645ee1';

export const movieByID = (movie_id) =>
  `https://api.themoviedb.org/3/movie/${movie_id}?api_key=570ae64e7e066406fbf495e24e645ee1&language=en-US`;
