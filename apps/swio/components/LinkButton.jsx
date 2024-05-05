import React from "react";
import classnames from "classnames";
import "./LinkButton.css";

function LinkButton({ id, className, onClick, children }) {
  const classes = classnames("link-button", className);
  return (
    <button id={id} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

export default LinkButton;
