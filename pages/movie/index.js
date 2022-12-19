import { memo, useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from '../../components';
import { movieByID } from '../../utils/Constant';
import { Context } from '../../store/AppContext';

const Movie = memo(() => {
  ///main application state initilize
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const { globalDispatch, globalState } = Context();
  let watchList = globalState.watchList;

  const movieObj = useMemo(() => {
    return { id: id };
  }, [id]);

  ///on opening page fetch api call
  useEffect(() => {
    setLoading(true);
    fetchMovieDetail();
  }, [movieObj]);

  //Method to fetch most popular movies
  const fetchMovieDetail = async () => {
    try {
      const data = await fetch(movieByID(id));
      const movies = await data.json();
      setMovieDetail(movies);
      console.log(movies);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
    }
  };

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  //add watch list item
  const addWatchList = (name) => {
    if (watchList === null) {
      watchList = [name];
    } else {
      const isVal = watchList.includes(name);
      if (!isVal) watchList.push(name);
    }
    globalDispatch({ type: 'watchList', payload: watchList });
  };

  //if loading true then loader will run
  if (loading) {
    return <div className="vertical-center loader"></div>;
  }
  return (
    <div className="wrapper">
      <div className="box left">
        <div className="sliderDetail">
          {movieDetail && (
            <Image
              src={
                'https://image.tmdb.org/t/p/w500' + movieDetail.backdrop_path
              }
              alt={'ss'}
              height={400}
              width={700}
              layout="responsive"
              loader={myLoader}
            />
          )}
        </div>
      </div>

      <div className="box right">
        <div className="inline">
          <div style={{ maxWidth: '500px', marginRight: '20px' }}>
            <div className="header_poster_wrapper true">
              <div className="title ott_true" dir="auto">
                <h2 className="18">
                  <a>{movieDetail && movieDetail.title}</a>
                </h2>
                <div className="facts">
                  <span className="release">
                    {movieDetail && movieDetail.release_date}
                  </span>
                  <span className="genres">
                    {movieDetail &&
                      movieDetail.genres &&
                      movieDetail.genres.map((item, index) => {
                        return <a key={item + index}> {item.name} ,&nbsp;</a>;
                      })}
                  </span>
                  <span className="runtime">
                    {movieDetail && movieDetail.runtime} Min
                  </span>
                </div>
                <div>
                  <h6>Overview</h6>
                  <span>{movieDetail && movieDetail.overview}</span>
                </div>
              </div>
            </div>
          </div>
          <Button
            primary={true}
            onClick={() => addWatchList(movieDetail.title)}
          >
            + Add Wish list
          </Button>
        </div>
      </div>
      <div className="box bottom">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <span>
              <h6>Production</h6>
              {movieDetail &&
                movieDetail.production_companies &&
                movieDetail.production_companies[0].name}
            </span>
          </div>
          <div>
            <span>
              <h6>Budget</h6>
              {movieDetail && movieDetail.budget && movieDetail.budget} USD
            </span>
          </div>
          <div>
            <span>
              <h6>Popularity</h6>
              {movieDetail && movieDetail.popularity && movieDetail.popularity}
            </span>
          </div>
          <div>
            <span>
              <h6>Revenue</h6>
              {movieDetail && movieDetail.revenue}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
Movie.displayName = 'Movie';
export default Movie;
