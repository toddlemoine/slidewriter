import classnames from "classnames";
import React from "react";
import "./IconButton.css";

export default function IconButton({ onClick, iconSvg, className, label }) {
  const classes = classnames("icon-button", className);
  return (
    <button className={classes} aria-label={label} onClick={onClick}>
      <img src={iconSvg} aria-hidden="true" />
    </button>
  );
}
