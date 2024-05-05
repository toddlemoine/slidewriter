import React from "react";
import classnames from "classnames";

export default function CircleIcon({ className }) {
  const classes = classnames("circle-icon", className);
  return (
    <svg className={classes} viewBox="0 0 512 512">
      <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z" />
    </svg>
  );
}
