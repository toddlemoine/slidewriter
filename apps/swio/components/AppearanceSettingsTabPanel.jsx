import React from "react";
import TabPanel from "./TabPanel";
import "./AppearanceSettingsTabPanel.css";

export default function AppearanceSettingsTabPanel({
  heading,
  children,
  ...props
}) {
  return (
    <TabPanel {...props} className="appearance-settings-tab-panel">
      <h1 className="heading">{heading}</h1>
      {children}
    </TabPanel>
  );
}
