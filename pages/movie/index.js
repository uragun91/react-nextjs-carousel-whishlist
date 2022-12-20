import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '../../components';
import { Context } from '../../store/AppContext';
import { movieByID } from '../../utils/Constant';
import Cn from 'classnames';

const Movie = memo(() => {
  const [movieDetail, setMovieDetail] = useState(null);
  const [movieYear, setMovieYear] = useState('');
  const [movieRevenue, setMovieRevenue] = useState(null);
  const [movieBudget, setMovieBudget] = useState(null);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id, type } = router.query;

  const { globalDispatch, globalState } = Context();
  let watchList = globalState.watchList;

  const fetchMovieDetail = useCallback(async () => {
    if (id) {
      try {
        const data = await fetch(movieByID(id));
        const movie = await data.json();
        setMovieDetail(movie);
        setLoading(false);
        const year = movie.release_date;
        if (year) {
          setMovieYear(year.substring(0, 4));
        }

        setMovieRevenue(
          new Intl.NumberFormat('en', {
            maximumSignificantDigits: 3,
          }).format(movieDetail.revenue)
        );

        setMovieBudget(
          new Intl.NumberFormat('en', {
            maximumSignificantDigits: 3,
          }).format(movieDetail.budget)
        );
      } catch (ex) {
        setLoading(false);
      }
    }
  }, [id, movieDetail?.revenue, movieDetail?.budget]);

  useEffect(() => {
    setLoading(true);
    fetchMovieDetail();
  }, [id, fetchMovieDetail]);

  const movieClassName = useMemo(() => Cn('movie', `movie--${type}`), [type]);

  const addMovieToWishList = (name) => {
    if (watchList === null) {
      watchList = [name];
    } else {
      const isVal = watchList.includes(name);
      if (!isVal) watchList.push(name);
    }
    globalDispatch({ type: 'watchList', payload: watchList });
  };

  if (!movieDetail) {
    return <div>Loading</div>;
  }

  return (
    <div className={movieClassName}>
      <div className="movie__top-box">
        <div className="movie__image-wrapper">
          <img
            src={'https://image.tmdb.org/t/p/w500' + movieDetail.backdrop_path}
            className="movie__image"
            alt={movieDetail.title}
          />
        </div>

        <div className="movie__information">
          <h1 className="movie__title">{movieDetail.title}</h1>

          <div className="movie__meta-data">
            <div className="movie__year-and-country">
              <span className="horizontal-list-item">{movieYear}</span>
              {(movieDetail.production_countries || []).map((country) => {
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
              {(movieDetail.genres || []).map((genre) => {
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
          <div className="movie__overview">{movieDetail.overview}</div>

          <Button
            className="movie__add-to-wishlist-button"
            variant={type}
            onClick={() => addMovieToWishList(movieDetail.title)}
          >
            Add to wishlist
          </Button>
        </div>
      </div>

      <div className="movie__bottom-box">
        <div className="movie__rating badge">
          <span className="badge__lable">Rating:</span>
          <span className="badge__value">{movieDetail.vote_average}</span>
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
