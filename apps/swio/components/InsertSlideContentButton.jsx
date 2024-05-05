import React, { Component } from "react";
import { inject } from "mobx-react";
import DropdownMenu from "./DropdownMenu";
import EditorToolbarButton from "./EditorToolbarButton";
import iconSvg from "../../shared/assets/layout.svg";
import ImageIcon from "../../shared/components/icons/ImageIcon";

function props({ presentationStore }) {
  return {
    addSlideLayout: presentationStore.addSlideLayout
  };
}

@inject(props)
class InsertSlideContentButton extends Component {
  items = [
    { value: "title", text: "Title slide" },
    { value: "text", text: "Text slide" },
    { value: "bulletedList", text: "Bulleted list slide" },
    { value: "numberedList", text: "Numbered list slide" },
    { value: "chart", text: "Chart slide" },
    { value: "code", text: "Code block slide" }
  ];

  handleSelect = layout => {
    this.props.addSlideLayout(layout);
  };
  render() {
    return (
      <DropdownMenu
        aria-label="Insert slide content"
        alignment="left"
        trigger={
          <EditorToolbarButton
            icon={<ImageIcon src={iconSvg} />}
            text="Layouts"
          />
        }
        triggerClassName="insert-slide-content"
        items={this.items}
        onSelect={this.handleSelect}
        className="insert-slide-content-menu"
      />
    );
  }
}

export default InsertSlideContentButton;
