import cx from "classnames";
import React from "react";
import "./TabList.css";

export default function TabList({
  onKeyDown,
  children,
  className = "",
  orientation = "horizontal"
}) {
  const classes = cx("tab-list", className);
  return (
    <ol
      aria-orientation={orientation}
      onKeyDown={onKeyDown}
      role="tablist"
      className={classes}
    >
      {children}
    </ol>
  );
}
