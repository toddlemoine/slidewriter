import React from "react";
import EditorTabs from "./EditorTabs";
import "./EditorTabBar.css";

export default function EditorTabBar({ orientation }) {
  return (
    <section className="editor-tab-bar" data-orientation={orientation}>
      <EditorTabs orientation={orientation} />
    </section>
  );
}
