import { inject } from "mobx-react";
import React, { Component } from "react";
import LinkButton from "./LinkButton";

function getProps({ store }) {
  return {
    toggleHelp: store.toggleGeneralHelp
  };
}

@inject(getProps)
class HelpButton extends Component {
  handleButtonClick = () => {
    this.props.toggleHelp(true);
  };
  render() {
    return (
      <LinkButton className="help-link" onClick={this.handleButtonClick}>
        Help
      </LinkButton>
    );
  }
}

export default HelpButton;
