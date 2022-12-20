import Image from 'next/image';
import Link from 'next/link';
import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components';
import { removeFromWishlist } from '../../store/store';

const Wishlist = memo(() => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeMovie = useCallback(
    (movieId) => {
      dispatch(removeFromWishlist(movieId));
    },
    [dispatch]
  );

  const loader = ({ src, width, quality = 30 }) => {
    return `${src}?w=${width}&q=${quality}`;
  };

  if (!Boolean(wishlist?.length)) {
    return (
      <div className="wishlist">
        <div className="empty-wishlist">
          Your wish list is empty. Please find something to watch on the{' '}
          <Link href="/">main page</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist">
      {wishlist.map((movie) => {
        return (
          <div key={movie.id} className="wishlist__movie wishlist-movie">
            <div className="wishlist-movie__poster">
              <Image
                className="wishlist-movie__image"
                src={'https://image.tmdb.org/t/p/w200' + movie.poster_path}
                width={200}
                height={300}
                alt={movie.path}
                layout="fixed"
                loader={loader}
              />
            </div>
            <div className="wishlist-movie__right">
              <div className="wishlist-movie__info">
                <h2 className="wishlist-movie__title">{movie.title}</h2>
                <div className="wishlist-movie__description">
                  {movie.overview}
                </div>
              </div>
              <Button
                className="wishlist-movie__drop"
                onClick={() => removeMovie(movie.id)}
                variant="primary"
                condenced={true}
              >
                Drop
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
});
Wishlist.displayName = 'Wishlist';
export default Wishlist;
