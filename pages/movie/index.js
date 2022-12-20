import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '../../components';
import { apiKey, baseUrl } from '../../utils/Constant';
import Cn from 'classnames';
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../../store/store';

const Movie = memo(() => {
  const [_, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieYear, setMovieYear] = useState('');
  const [movieRevenue, setMovieRevenue] = useState(null);
  const [movieBudget, setMovieBudget] = useState(null);

  const dispatch = useDispatch();

  const router = useRouter();
  const { id, type } = router.query;

  const fetchMovieDetails = useCallback(async () => {
    if (id) {
      try {
        const data = await fetch(
          `${baseUrl}${id}?api_key=${apiKey}&language=en-US`
        );
        const movie = await data.json();
        setMovieDetails(movie);
        setLoading(false);
        const year = movie.release_date;
        if (year) {
          setMovieYear(year.substring(0, 4));
        }

        setMovieRevenue(
          new Intl.NumberFormat('en', {
            maximumSignificantDigits: 3,
          }).format(movieDetails.revenue)
        );

        setMovieBudget(
          new Intl.NumberFormat('en', {
            maximumSignificantDigits: 3,
          }).format(movieDetails.budget)
        );
      } catch (ex) {
        setLoading(false);
      }
    }
  }, [id, movieDetails?.revenue, movieDetails?.budget]);

  useEffect(() => {
    fetchMovieDetails();
  }, [id, fetchMovieDetails]);

  const movieClassName = useMemo(() => Cn('movie', `movie--${type}`), [type]);

  const addMovieToWishList = () => {
    dispatch(addToWishlist(movieDetails));
  };

  if (!movieDetails) {
    return <div>Loading</div>;
  }

  return (
    <div className={movieClassName}>
      <div className="movie__top-box">
        <div className="movie__image-wrapper">
          <img
            src={'https://image.tmdb.org/t/p/w500' + movieDetails.backdrop_path}
            className="movie__image"
            alt={movieDetails.title}
          />
        </div>

        <div className="movie__information">
          <h1 className="movie__title">{movieDetails.title}</h1>

          <div className="movie__meta-data">
            <div className="movie__year-and-country">
              <span className="horizontal-list-item">{movieYear}</span>
              {(movieDetails.production_countries || []).map((country) => {
                return (
                  <span
                    key={country['iso_3166_1']}
                    className="horizontal-list-item"
                  >
                    {country.name}
                  </span>
                );
              })}
            </div>
            <div className="movie__genre-details">
              {(movieDetails.genres || []).map((genre) => {
                return (
                  <span
                    className="movie__genre horizontal-list-item"
                    key={genre.id}
                  >
                    {genre.name}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="movie__overview">{movieDetails.overview}</div>

          <Button
            className="movie__add-to-wishlist-button"
            variant={type}
            onClick={() => addMovieToWishList(movieDetails.title)}
          >
            Add to wishlist
          </Button>
        </div>
      </div>

      <div className="movie__bottom-box">
        <div className="movie__rating badge">
          <span className="badge__lable">Rating:</span>
          <span className="badge__value">{movieDetails.vote_average}</span>
        </div>

        <div className="movie__rating badge">
          <span className="badge__lable">Budget:</span>
          <span className="badge__value">{movieBudget}$</span>
        </div>

        <div className="movie__rating badge">
          <span className="badge__lable">Revenue:</span>
          <span className="badge__value">{movieRevenue}$</span>
        </div>
      </div>
    </div>
  );
});
Movie.displayName = 'Movie';
export default Movie;
