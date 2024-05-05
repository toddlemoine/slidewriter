import React, { Component } from "react";
import { inject } from "mobx-react";
import ActivityBarButton from "./ActivityBarButton";

function getProps({ store }) {
  return {
    toggleSettings: store.toggleSettings
  };
}

@inject(getProps)
class SettingsButton extends Component {
  handleButtonClick = () => {
    this.props.toggleSettings(true);
  };
  render() {
    return (
      <ActivityBarButton
        className="settings-link"
        onClick={this.handleButtonClick}
      >
        Settings
      </ActivityBarButton>
    );
  }
}

export default SettingsButton;
