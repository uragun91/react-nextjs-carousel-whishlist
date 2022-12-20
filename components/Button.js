import React from 'react';
import PropTypes from 'prop-types';
import Cn from 'classnames';

const variants = ['primary', 'secondary', 'default', 'warn'];

export default function Button({
  variant = 'default',
  condenced = false,
  onClick,
  children,
  ...props
}) {
  const { className, ...rest } = props;
  const classNames = Cn(
    'button',
    `button--${variants.includes(variant) ? variant : 'default'}`,
    {
      'button--condenced': condenced,
    },
    className
  );

  return (
    <button type="button" className={classNames} {...rest} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'warn']),
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  condenced: PropTypes.bool,
};

Button.defaultProps = {
  variant: 'default',
  onClick: undefined,
  condenced: false,
};
