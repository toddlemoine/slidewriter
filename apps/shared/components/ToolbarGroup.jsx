import React from "react";
import classnames from "classnames";
import "./ToolbarGroup.css";

function ToolbarGroup({ children, className, align = "left" }) {
  const classes = classnames("toolbar-group", className, {
    "align-left": align === "left",
    "align-right": align === "right"
  });
  return <div className={classes}>{children}</div>;
}

export default ToolbarGroup;
