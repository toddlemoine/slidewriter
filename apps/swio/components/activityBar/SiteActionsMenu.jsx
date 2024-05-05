import React, { Component } from "react";
import DropdownMenu from "../DropdownMenu";
import Logo from "../../../shared/components/Logo";

class SiteActionsMenu extends Component {
  items = [
    { value: "about", text: "About Slidewriter.io" },
    { value: "terms", text: "Terms of use" },
    { value: "privacy", text: "Privacy policy" }
  ];

  handleSelect = url => {
    window.location = `/${url}`;
  };

  render() {
    return (
      <DropdownMenu
        aria-label="Slidewriter.io menu"
        alignment="left"
        trigger={<Logo color="black" />}
        triggerClassName="activity-bar-button"
        items={this.items}
        onSelect={this.handleSelect}
        className="site-actions-menu"
      />
    );
  }
}

export default SiteActionsMenu;
