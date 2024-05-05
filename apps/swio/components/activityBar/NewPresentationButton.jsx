import React, { Component } from "react";
import { inject } from "mobx-react";
import "./NewPresentationButton.css";
import PrimaryButton from "../../../shared/components/PrimaryButton";
import ImageIcon from "../../../shared/components/icons/ImageIcon";
import iconSvg from "../../../shared/assets/plus-square.svg";
import PlusSquareIcon from "../../../shared/components/icons/PlusSquareIcon";

function getProps({ hub }) {
  return {
    createPresentation: () => hub.createPresentation()
  };
}

@inject(getProps)
class NewPresentationButton extends Component {
  render() {
    const { content } = this.props;
    return (
      <PrimaryButton
        className="new-presentation-button"
        onClick={this.props.createPresentation}
      >
        <PlusSquareIcon />
        New
      </PrimaryButton>
    );
  }
}

export default NewPresentationButton;
