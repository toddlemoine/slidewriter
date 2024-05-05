import { inject } from "mobx-react";
import React, { Component } from "react";
import EditorToolbarButton from "./EditorToolbarButton";

@inject("exportStore")
class ExportButton extends Component {
  render() {
    const { exportStore } = this.props;
    return (
      <EditorToolbarButton
        className="export-button"
        onClick={exportStore.export}
        text="Export"
      />
    );
  }
}

export default ExportButton;
