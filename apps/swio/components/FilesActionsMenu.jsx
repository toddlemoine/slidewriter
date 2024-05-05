import React, { Component } from "react";
import { Wrapper, Button, Menu, MenuItem } from "react-aria-menubutton";
import DropdownMenu from "./DropdownMenu";
import "./FilesActionsMenu.css";

class FilesActionsMenu extends Component {
  items = [{ value: "delete", text: "Delete" }];
  handleSelection = val => {
    this.props.onSelect(val, this.props.fileId);
  };
  render() {
    return (
      <DropdownMenu
        alignment="right"
        disabled={this.props.disabled}
        trigger={<span>•••</span>}
        triggerClassName="trigger"
        items={this.items}
        onSelect={this.handleSelection}
        className="files-actions-menu"
      />
    );
  }
}

export default FilesActionsMenu;
