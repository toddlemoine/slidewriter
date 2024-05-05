import React from "react";
import classnames from "classnames";

export default function ActivityBarLink({ className, children, ...props }) {
  const classes = classnames("activity-bar-link", className);
  return (
    <a {...props} className={classes}>
      {children}
    </a>
  );
}
