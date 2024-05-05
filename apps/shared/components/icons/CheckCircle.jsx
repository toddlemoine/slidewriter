import React from "react";
import classnames from "classnames";
import Icon from "./Icon";

export default function CheckCircleIcon({ className }) {
  const classes = classnames("check-circle-icon", className);
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
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    </Icon>
  );
}
