import React from 'react';
import PropTypes from 'prop-types';
import Cn from 'classnames';

export default function Button({
  variant = 'default',
  onClick,
  children,
  ...props
}) {
  const { className, ...rest } = props;
  const classNames = Cn('button', `button--${variant}`, className);

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
};

Button.defaultProps = {
  variant: 'default',
  onClick: undefined,
};
