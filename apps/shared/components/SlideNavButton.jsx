import React from "react";
import Button from "./Button.jsx";
import "./SlideNavButton.css";

function SlideNavButton({ id, onClick, label, children, disabled }) {
  const classes = "slide-nav-button";
  return (
    <Button
      id={id}
      disabled={disabled}
      className={classes}
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </Button>
  );
}

export default SlideNavButton;
