import React from "react";
import classnames from "classnames";
import Icon from "./Icon";

export default function PlayIcon({ className }) {
  const classes = classnames("play-icon", className);
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
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    </Icon>
  );
}
