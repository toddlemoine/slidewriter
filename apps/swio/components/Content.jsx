import React from "react";
import classnames from "classnames";

export default function Content({ children, className }) {
  const classes = classnames("content", className);
  return <section className={classes}>{children}</section>;
}
