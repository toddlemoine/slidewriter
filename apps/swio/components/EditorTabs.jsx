import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { isLeft, isRight, isDown, isUp } from "../helpers/keys";
import "./EditorTabs.css";
import Tab from "./Tab.jsx";
import TabList from "./TabList.jsx";
import ApertureIcon from "../../shared/components/icons/ApertureIcon";
import LayersIcon from "../../shared/components/icons/LayersIcon";
import MoreHorizontalIcon from "../../shared/components/icons/MoreHorizontalIcon";
import PlayCircleIcon from "../../shared/components/icons/PlayCircle";

function getProps({ store }) {
  return {
    activePanel: store.activePanel,
    switchPanels: store.switchPanels,
    switchToNextPanel: store.switchToNextPanel,
    switchToPreviousPanel: store.switchToPreviousPanel,
    sourcePanelActive: store.sourcePanelActive,
    stylesPanelActive: store.stylesPanelActive,
    footerPanelActive: store.footerPanelActive,
    playbackPanelActive: store.playbackPanelActive
  };
}
@inject(getProps)
@observer
class EditorTabs extends Component {
  constructor(props) {
    super(props);
    this.tabs = {};
  }

  componentDidUpdate() {
    if (this.refocus) {
      const tab = this.tabs[this.props.activePanel];
      tab && tab.focus();
      this.refocus = false;
    }
  }

  isNextKey = e => {
    return this.props.orientation === "vertical" ? isDown(e) : isRight(e);
  };

  isPreviousKey = e => {
    return this.props.orientation === "vertical" ? isUp(e) : isLeft(e);
  };

  setTabInst = (id, inst) => {
    this.tabs[id] = inst;
  };

  handleKeyDown = e => {
    if (this.isPreviousKey(e)) {
      this.refocus = true;
      this.props.switchToPreviousPanel();
    }

    if (this.isNextKey(e)) {
      this.refocus = true;
      this.props.switchToNextPanel();
    }
  };

  render() {
    const {
      sourcePanelActive,
      stylesPanelActive,
      footerPanelActive,
      playbackPanelActive,
      switchPanels,
      orientation
    } = this.props;
    return (
      <TabList
        onKeyDown={this.handleKeyDown}
        className="editor-tabs"
        orientation={orientation}
      >
        <Tab
          id="slidesTab"
          ref={inst => this.setTabInst("slides", inst)}
          onClick={() => switchPanels("slides")}
          controls="slidesTabPanel"
          selected={sourcePanelActive}
        >
          <LayersIcon />
          Slides
        </Tab>
        <Tab
          id="stylesTab"
          ref={inst => this.setTabInst("styles", inst)}
          onClick={() => switchPanels("styles")}
          controls="stylesTabPanel"
          selected={stylesPanelActive}
        >
          <ApertureIcon />
          Design
        </Tab>
        <Tab
          id="footerTab"
          ref={inst => this.setTabInst("footer", inst)}
          onClick={() => switchPanels("footer")}
          controls="footerTabPanel"
          selected={footerPanelActive}
        >
          <MoreHorizontalIcon />
          Footer
        </Tab>
        <Tab
          id="playbackTab"
          ref={inst => this.setTabInst("playback", inst)}
          onClick={() => switchPanels("playback")}
          controls="playbackTabPanel"
          selected={playbackPanelActive}
        >
          <PlayCircleIcon />
          Playback
        </Tab>
      </TabList>
    );
  }
}

export default EditorTabs;
