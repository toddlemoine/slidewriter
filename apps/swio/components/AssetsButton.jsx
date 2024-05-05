import React, { Fragment, Component } from "react";
import { inject } from "mobx-react";
import EditorToolbarButton from "./EditorToolbarButton";
import ImageIcon from "../../shared/components/icons/ImageIcon";
import iconSvg from "../../shared/assets/image.svg";

function props({ presentationStore }) {
  return {
    pressed: presentationStore.showAssets,
    toggle: presentationStore.toggleAssets
  };
}

@inject(props)
class AssetsButton extends Component {
  handleClick = () => {
    this.props.toggle();
  };
  handleBlur = e => {
    if (this.props.pressed) {
    }
  };
  render() {
    return (
      <EditorToolbarButton
        onBlur={this.handleBlur}
        className="assets-button"
        onClick={this.handleClick}
        icon={<ImageIcon src={iconSvg} />}
        text="Images"
        aria-pressed={this.props.pressed}
      />
    );
  }
}

export default AssetsButton;
