import React from "react";
import EditorTabPanel from "./EditorTabPanel";
import ThemeSettings from "./appearance/ThemeSettings";
import SlideSettings from "./appearance/SlideSettings";
import TextSettings from "./appearance/TextSettings";
import HeadingSettings from "./appearance/HeadingSettings";
import CodeSettings from "./appearance/CodeSettings";
import ChartSettings from "./appearance/ChartSettings";
import "./StylesPanel.css";
import HelpText from "../../shared/components/HelpText";

export default function StylesPanel() {
  return (
    <EditorTabPanel id="styles" className="styles-panel">
      <HelpText>
        Set a theme and customize other text and slide settings.
      </HelpText>
      <ThemeSettings />
      <SlideSettings />
      <TextSettings />
      <HeadingSettings />
      <CodeSettings />
      <ChartSettings />
    </EditorTabPanel>
  );
}
