import React from "react";
import classnames from "classnames";
import "./InputGroup.css";

export default function InputGroup({ children, orientation = "horizontal" }) {
  const classes = classnames("input-group", orientation);
  return <div className={classes}>{children}</div>;
}
