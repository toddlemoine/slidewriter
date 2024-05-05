import React, { Component } from "react";
import { inject } from "mobx-react";
import debounce from "lodash.debounce";
import Button from "../../../shared/components/Button";
import FolderIcon from "../../../shared/components/icons/FolderIcon";

function getProps({ store }) {
  return {
    openFiles: () => store.toggleFiles(true)
  };
}

@inject(getProps)
class OpenFilesButton extends Component {
  handleButtonClick = debounce(this.props.openFiles, 500, { leading: true });
  render() {
    return (
      <Button id="open-presentation" onClick={this.handleButtonClick}>
        <FolderIcon />
        Open saved...
      </Button>
    );
  }
}

export default OpenFilesButton;
