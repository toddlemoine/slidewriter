import React from "react";
import classnames from "classnames";
import Icon from "./Icon";

export default function PlayCircleIcon({ className }) {
  const classes = classnames("play-circle-icon", className);
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
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" />
      </svg>
    </Icon>
  );
}
