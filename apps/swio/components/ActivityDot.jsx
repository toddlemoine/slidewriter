import React from "react";
import classnames from "classnames";
import CircleIcon from "../../shared/components/icons/CircleIcon";
import "./ActivityDot.css";

export default function ActivityDot({ status, show = true }) {
  const classes = classnames("activity-dot", status);
  return <div className={classes}>{show && <CircleIcon />}</div>;
}
