import React from "react";
import classnames from "classnames";
import "./EditorToolbarButton.css";

export default function EditorToolbarButton({
  className,
  onClick,
  text,
  icon,
  ...otherProps
}) {
  const classes = classnames("editor-toolbar-button", className);
  return (
    <button className={classes} onClick={onClick} {...otherProps}>
      {icon}
      {text}
    </button>
  );
}
