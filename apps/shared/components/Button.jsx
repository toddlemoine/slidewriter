import classnames from "classnames";
import { omit } from "lodash";
import React from "react";
import "./Button.css";

export const Button = React.forwardRef((props, ref) => {
  const classes = classnames("button", props.className, props.size);
  const safeProps = omit(props, ["children", "dark"]);

  return (
    <button {...safeProps} ref={ref} className={classes} data-cy={props.id}>
      {props.children}
    </button>
  );
});

export default Button;
