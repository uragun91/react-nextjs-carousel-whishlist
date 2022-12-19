import React, { useCallback, useEffect, useState } from 'react';
import { Carousel } from '../../components';
import { baseUrl, apiKey } from '../../utils/Constant';

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loadingTopRated, setLoadingTopRated] = useState(false);
  const [loadingPopular, setLoadingPopular] = useState(false);
  const [loadingUpcoming, setLoadingUpcoming] = useState(false);

  const fetchMovies = useCallback(async (category, setMovies, setLoading) => {
    const url = `${baseUrl}${category}?api_key=${apiKey}&language=en&page=1`;

    try {
      setLoading(true);
      const data = await fetch(url);
      const movies = await data.json();
      setMovies(movies.results);
    } catch (ex) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies('popular', setPopular, setLoadingPopular);
    fetchMovies('top_rated', setTopRated, setLoadingTopRated);
    fetchMovies('upcoming', setUpcoming, setLoadingUpcoming);
  }, [fetchMovies]);

  return (
    <div className="container">
      <div className="movies-carousel">
        <Carousel movies={popular} title="Popular" loading={loadingPopular} />
      </div>
      <div className="movies-carousel">
        <Carousel
          movies={topRated}
          title="Top Rated"
          loading={loadingTopRated}
        />
      </div>
      <div className="movies-carousel">
        <Carousel
          movies={upcoming}
          title="Upcoming"
          loading={loadingUpcoming}
        />
      </div>
    </div>
  );
}
