import React from "react";
import classnames from "classnames";
import TabPanel from "./TabPanel";
import "./EditorTabPanel.css";

export default function EditorTabPanel({ className, children, ...props }) {
  const classes = classnames("editor-tab-panel", className);
  return (
    <TabPanel {...props} className={classes}>
      {children}
    </TabPanel>
  );
}
