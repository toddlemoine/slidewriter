import React from "react";
import classnames from "classnames";

export default function ActivityBarGroup({ className, children }) {
  const classes = classnames("activity-bar-group", className);
  return <div className={classes}>{children}</div>;
}
