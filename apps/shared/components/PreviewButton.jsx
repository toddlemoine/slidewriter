import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "./PreviewButton.css";
import { Button } from "./Button";
import EyeOffIcon from "./icons/EyeOffIcon";
import EyeIcon from "./icons/EyeIcon";

function props({ store }) {
  return {
    isPreviewing: store.isPreviewing,
    togglePreview: store.togglePreview
  };
}

@inject(props)
@observer
class PreviewButton extends Component {
  render() {
    const text = this.props.isPreviewing ? "Exit Preview" : "Preview";
    const icon = this.props.isPreviewing ? <EyeOffIcon /> : <EyeIcon />;
    return (
      <Button className="preview-button" onClick={this.props.togglePreview}>
        {icon}
        {text}
      </Button>
    );
  }
}

export default PreviewButton;
