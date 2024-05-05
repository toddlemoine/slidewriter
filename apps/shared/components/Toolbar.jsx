import React from "react";
import classnames from "classnames";
import "./Toolbar.css";

export default function Toolbar({ children, className }) {
  const classes = classnames("toolbar", className);
  return <div className={classes}>{children}</div>;
}
