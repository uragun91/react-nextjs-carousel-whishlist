import { render, screen } from '@testing-library/react';
import React from 'react';
import Home from '../pages/mainpage/index';

describe('Main page', () => {
  it('should have 3 different categories: Popular, Top rated and Upcoming', () => {
    render(<Home />);
    expect(screen.getByText(/Top Rated/i)).toBeInTheDocument();
    expect(screen.getByText(/Upcoming/i)).toBeInTheDocument();
    expect(screen.getByText(/Popular/i)).toBeInTheDocument();
  });
});
