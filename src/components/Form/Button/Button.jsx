import React from "react";
import cx from "classnames";

const Button = ({
  onClick,
  text,
  type,
  isSecondary,
  addClass,
  ...otherProps
}) => (
  <button
    className={cx(
      "govuk-button",
      { "govuk-button--secondary": isSecondary },
      addClass
    )}
    data-module="govuk-button"
    onClick={onClick}
    type={type}
    {...otherProps}
  >
    {text}
  </button>
);

export default Button;
