import { render, screen } from '@testing-library/react';
import React from 'react';
import Button from '../components/Button';

describe('Button', () => {
  it('should properly pass primary variant prop to class', () => {
    const { container } = render(<Button variant="primary" />);
    expect(container.firstChild).toHaveClass('button--primary');
  });

  it('should properly pass secondary variant prop to class', () => {
    const { container } = render(<Button variant="secondary" />);
    expect(container.firstChild).toHaveClass('button--secondary');
  });

  it('should employ default variant if no variant prop is passed', () => {
    const { container } = render(<Button />);
    expect(container.firstChild).toHaveClass('button--default');
  });

  it('should employ default variant if wrong variant is passed', () => {
    const { container } = render(<Button variant="rrr" />);
    expect(container.firstChild).toHaveClass('button--default');
  });
});
