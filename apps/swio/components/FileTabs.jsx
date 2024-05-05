import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import NewPresentationButton from "./activityBar/NewPresentationButton";
import { isLeft, isRight, isDown, isUp } from "../helpers/keys";
import Tab from "./Tab";
import TabList from "./TabList";
import "./FileTabs.css";

function props({ store }) {
  return {
    switchPanels: store.switchPanels,
    switchToNextPanel: store.switchToNextPanel,
    switchToPreviousPanel: store.switchToPreviousPanel,
    active: store.filesPanelActive
  };
}
@inject(props)
@observer
class FileTabs extends Component {
  handleClick = () => {
    this.props.switchPanels("files");
  };
  componentDidUpdate(prevProps) {
    if (!prevProps.active && this.props.active) {
      //   this.tab.focus();
    }
  }

  isNextKey = e => {
    return this.props.orientation === "vertical" ? isDown(e) : isRight(e);
  };

  isPreviousKey = e => {
    return this.props.orientation === "vertical" ? isUp(e) : isLeft(e);
  };

  setRef = inst => {
    this.tab = inst;
  };

  handleKeyDown = e => {
    if (this.isPreviousKey(e)) {
      this.props.switchToPreviousPanel();
    }

    if (this.isNextKey(e)) {
      this.props.switchToNextPanel();
    }
  };

  render() {
    return (
      <TabList
        orientation="vertical"
        className="file-tabs"
        onKeyDown={this.handleKeyDown}
      >
        <Tab
          ref={this.setRef}
          tabIndex={0}
          className="file-tab-files"
          onClick={this.handleClick}
          selected={this.props.active}
        >
          Files
          <NewPresentationButton content="+" />
        </Tab>
      </TabList>
    );
  }
}

export default FileTabs;
