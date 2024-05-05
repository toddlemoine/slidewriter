import React from "react";
import classnames from "classnames";
import Icon from "./Icon";

export default function EyeIcon({ className }) {
  const classes = classnames("eye-icon", className);
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
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </Icon>
  );
}
