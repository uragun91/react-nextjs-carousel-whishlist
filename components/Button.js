import React from "react";
import PropTypes from "prop-types";
import Cn from "classnames";

export default function Button({
  primary,
  onClick,
  children,
  custom,
  ...props
}) {
  const isPrimary = primary
    ? "button--primary"
    : custom
    ? custom
    : "button--secondary";
  const classNames = Cn("button", isPrimary);

  return (
    <button type="button" className={classNames} {...props} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  primary: PropTypes.bool,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  primary: false,
  onClick: undefined,
};
