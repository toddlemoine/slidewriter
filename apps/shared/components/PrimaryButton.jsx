import React from "react";
import classnames from "classnames";
import Button from "./Button";
import "./PrimaryButton.css";

const PrimaryButton = React.forwardRef(
  ({ className, children, ...otherProps }, ref) => {
    const classes = classnames("primary-button", className);
    return (
      <Button ref={ref} className={classes} {...otherProps}>
        {children}
      </Button>
    );
  }
);

export default PrimaryButton;
