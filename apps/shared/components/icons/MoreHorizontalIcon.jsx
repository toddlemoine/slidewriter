import React from "react";
import classnames from "classnames";
import Icon from "./Icon";

export default function MoreHorizontalIcon({ className }) {
  const classes = classnames("more-horizontal-icon", className);
  return (
    <Icon className={classes}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
    </Icon>
  );
}
