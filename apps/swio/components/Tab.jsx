import React, { Component } from "react";
import "./Tab.css";

class Tab extends Component {
  focus = () => {
    this.node.focus();
  };

  setButtonRef = node => {
    this.node = node;
  };

  handleKeyDown = ({ keyCode }) => {
    if (keyCode === "space") {
      this.handleClick();
    }
  };

  handleClick = () => {
    this.props.onClick(this.props.id);
  };

  render() {
    const {
      className = "",
      selected,
      controls,
      tabIndex,
      children
    } = this.props;
    const hasTabIndex = tabIndex !== undefined;
    const tabIndexBasedOnSelected = selected ? 0 : -1;
    const computedTabIndex = hasTabIndex ? tabIndex : tabIndexBasedOnSelected;

    const classes = ["tab", className].join(" ");
    return (
      <li
        className={classes}
        aria-controls={controls}
        aria-selected={selected}
        role="tab"
        tabIndex={computedTabIndex}
        ref={this.setButtonRef}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
      >
        {children}
      </li>
    );
  }
}

export default Tab;
