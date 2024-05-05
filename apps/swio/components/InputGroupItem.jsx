import React from "react";
import classnames from "classnames";
import "./InputGroupItem.css";

export default function InputGroupItem({ children, className }) {
  const classes = classnames("input-group-item", className);
  return <div className={classes}>{children}</div>;
}
