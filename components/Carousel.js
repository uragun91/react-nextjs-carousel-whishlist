import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import MoviePlaceholder from './MoviePlaceholder';

export default function Carousel({ movies = [], title = '', loading = false }) {
  const router = useRouter();
  const frameRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const loader = ({ src, width }) => {
    return `${src}?w=${width}`;
  };

  const handleItemClick = (item) => {
    router.push(`/movie?id=${item.id}`);
  };

  const handleDirectionClick = useCallback(
    (direction) => {
      const frameRect = frameRef.current.getBoundingClientRect();
      const firstItem = frameRef.current.querySelector('.slider__item');
      const itemComputedStyles = getComputedStyle(firstItem);
      const [margin] = itemComputedStyles.marginRight.split('px');
      const [width] = itemComputedStyles.width.split('px');
      const oneItemWidth = +width + +margin;
      const itemsPerFrame = parseInt(
        (+frameRect.width + +margin) / oneItemWidth
      );

      let newIndex;

      if (direction === 1) {
        newIndex = currentIndex + itemsPerFrame;
      } else {
        newIndex = currentIndex - itemsPerFrame;
      }
      if (newIndex + itemsPerFrame > movies.length - 1) {
        newIndex = movies.length - itemsPerFrame;
      }
      if (newIndex < 0) {
        newIndex = 0;
      }

      if (newIndex !== currentIndex) {
        const newLeft = -newIndex * oneItemWidth;
        frameRef.current.style.left = `${newLeft}px`;
        setCurrentIndex(newIndex);
      }
    },
    [currentIndex, setCurrentIndex, movies.length]
  );

  return (
    <div className="carousel">
      <div className="carousel__title">{title}</div>
      <div className="carousel__slider slider">
        <svg
          className="slider__left"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="300"
          fill="white"
          viewBox="0 0 16 16"
          onClick={() => handleDirectionClick(-1)}
        >
          <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
        </svg>
        <div className="slider__frame">
          <div className="slider__items-wrapper" ref={frameRef}>
            {loading ? (
              <MoviePlaceholder />
            ) : (
              Boolean(movies?.length) &&
              movies.map((item, index) => {
                return (
                  <div
                    key={`slide-${index}`}
                    className="slider__item"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="slider__image-container">
                      <Image
                        className="slider__image"
                        src={
                          'https://image.tmdb.org/t/p/w200' + item.poster_path
                        }
                        width={200}
                        height={300}
                        alt={item.path}
                        loader={loader}
                      />
                    </div>
                    <div className="slider__image-title">{item.title}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <svg
          className="slider__right"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="300"
          fill="white"
          viewBox="0 0 16 16"
          onClick={() => handleDirectionClick(1)}
        >
          <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </div>
    </div>
  );
}

Carousel.propTypes = {
  carousel: PropTypes.array,
  title: PropTypes.string,
  loading: PropTypes.bool,
};

Carousel.defaultProps = {
  carousel: [],
  title: '',
  loading: false,
};
