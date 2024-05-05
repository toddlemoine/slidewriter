import marked from "marked";
import { inject } from "mobx-react";
import React, { Component } from "react";
import content from "../docs/editor.md";
import "./GeneralHelp.css";
import SidePanel from "./SidePanel.jsx";
import KeyboardHelp from "./KeyboardHelp";

@inject("store")
class GeneralHelp extends Component {
  handleCloseClick = () => {
    this.props.store.toggleGeneralHelp(false);
  };

  render() {
    const html = marked(content);
    return (
      <SidePanel
        className="general-help"
        title="Help"
        onClose={this.handleCloseClick}
      >
        <KeyboardHelp />
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </SidePanel>
    );
  }
}

export default GeneralHelp;
