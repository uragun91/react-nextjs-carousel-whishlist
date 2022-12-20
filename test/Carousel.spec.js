import { render, screen } from '@testing-library/react';
import React from 'react';
import Carousel from '../components/Carousel';

describe('Carousel', () => {
  it('should render 3 slides if we pass 3 movies', () => {
    const { container } = render(<Carousel movies={[{}, {}, {}]} />);
    const slides = container.getElementsByClassName('slider__item');
    expect(slides.length).toEqual(3);
  });

  it('should have disabled left button in initial state', () => {
    const { container } = render(<Carousel movies={[{}, {}, {}]} />);
    const leftButton = container.getElementsByClassName('slider__left')[0];
    expect(leftButton).toHaveClass('disabled');
  });
});
