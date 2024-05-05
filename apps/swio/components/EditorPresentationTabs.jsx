import React, { Component } from "react";
import NewPresentationButton from "./NewPresentationButton";
import OpenFilesButton from "./OpenFilesButton";
import "./EditorPresentationTabs.css";

class EditorPresentationTabs extends Component {
  render() {
    return (
      <div className="editor-presentation-tabs">
        <NewPresentationButton />
        <OpenFilesButton />
      </div>
    );
  }
}

export default EditorPresentationTabs;
